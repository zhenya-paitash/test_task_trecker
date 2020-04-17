let
  indexRouter  = require("express").Router(),
  Sequelize    = require("sequelize"),
  Op           = Sequelize.Op,
  bcrypt       = require("bcrypt"),
  passport     = require("passport"),
  jwt          = require("jsonwebtoken"),
  jwtoken      = require("../middleware/jwtoken"),
  mailer       = require("../middleware/nodemailer"),

  model        = require("../models"),
  Users        = model.User,
  UserRoles    = model.UserRole,
  UserSocials  = model.UserSocial,
  NewUsers     = model.NewUser,
  ProjectUsers = model.ProjectUser,
  TaskUsers    = model.TaskUser,
  Comments     = model.Comment;
  // Users        = require("../old-models/done/user-model"),
  // UserRoles    = require("../old-models/done/userrole-model"),
  // UserSocials  = require("../old-models/done/usersocial-model"),
  // NewUsers     = require("../old-models/done/newusers-model"),
  // ProjectUsers = require("../old-models/done/projectuser-model"),
  // TaskUsers    = require("../old-models/done/taskuser-model"),
  // Comments     = require("../old-models/done/comment-model");


// GET
indexRouter.mainPage   = (req, res) => res.redirect("/project");
indexRouter.signupPage = (req, res) => res.render("index/signup", {title:"SIGN UP"});
indexRouter.loginPage  = (req, res) => res.render("index/login", {title:"LOGIN"});
indexRouter.logout     = (req, res) => {
  req.logOut();
  res.clearCookie("jwt.sid");
  res.redirect("/login")
};
// /user
indexRouter.userSearchPage = async (req, res) => {
  let search          = req.query.search;
  if (search) search  = search.toLowerCase();

  let firstnameResult = await Users.findAll({where: {firstname: { [Op.like]: "%" + search + "%" } }});
  let lastnameResult  = await Users.findAll({where: {lastname: { [Op.like]: "%" + search + "%" } }});
  let result          = [...firstnameResult, ...lastnameResult];
  let users           = await Users.findAll({ order: [ [ 'lastname', 'ASC' ] ]});
  res.render("index/usersearch", {search, users, result, title:`Tasktrecker. Search`})
};

// /user/:id_user
indexRouter.userPage = (req, res) => {
  Users.findOne({ where: { id: req.params.id_user } })
    .then(async (user) => {
      if (user) {
        let social       = await  UserSocials.findOne({where: {id_user: user.id}});
        let userProjects = await ProjectUsers.findAll({where: {id_user: user.id}});
        let userTasks    = await TaskUsers.findAll({where: {id_user: user.id}});
        let userComments = await Comments.findAll({where: {author: user.id}});
        let role         = await UserRoles.findOne({where: {id: user.role}});
        res.render("index/user", {user, role, social, userProjects, userTasks, userComments,
          title:`Tasktrecker. ${user.firstname} ${user.lastname}`})
      } else {
        req.flash("info", "User with this ID not found!");
        res.redirect('/user')
      }
    })
    .catch(err => {
      console.error(err);
      req.flash("error", err.message);
      res.redirect("back")
    })
};


indexRouter.activate = async (req, res) => {
  let reqToken = req.query.token;
  NewUsers.findOne({where: {jwt: reqToken}})
    .then(token => {
      if(token !== null) {
        // console.log(token);
        jwt.verify(token.jwt, process.env.REGISTER_SECRET_TOKEN,  async (er, data) => {
          await token.destroy();
          if (er) {
            req.flash("error", "This token has expired, please register again.");
            res.redirect("/signup")
          } else {
            const newUser = {
              email:      data.email,
              firstname:  data.firstname,
              lastname:   data.lastname,
              password:   data.password,
              role:       data.role
            };
            // const gap = await jwt.sign(newUser, process.env.REFRESH_SECRET_TOKEN);
            // newUser.rft = encrypt(gap);

            Users.create(newUser)
              .then(async user => {
                await UserSocials.create({id_user: user.id});
                req.flash("success", "Registration completed. Account activated.");
                res.redirect("/login")
              })
              .catch(err => {
                req.flash("error", "User with this email is already registered.");
                res.redirect("/signup")
              });
          }
        })
      } else {
        req.flash("error", "Token not found.");
        res.redirect("/signup")
      }

    })
    .catch(er => {
      req.flash("error", er.message);
      res.redirect("/signup")
    });
};


// POST
indexRouter.signup = async (req, res) => {
  try {
    let emailCheck = await Users.findOne({where: {email: req.body.email.toLowerCase() }});

    if (emailCheck) {
      req.flash("error", "User with this email is already registered");
      return res.redirect("/signup")
    }

    const salt          = await bcrypt.genSalt(10);
    const hashPassword  = await bcrypt.hash(req.body.password, salt);
    let newUser = {
      email:     req.body.email.toLowerCase(),
      firstname: req.body.firstname.toLowerCase(),
      lastname:  req.body.lastname.toLowerCase(),
      password:  hashPassword,
      role:      req.body.role
    };

    const token = await jwt.sign(newUser, process.env.REGISTER_SECRET_TOKEN, {expiresIn: "24h"});
    const mail = {
      to: `${newUser.email}`,
      subject: "Please complete the registration.",
      html: `
        <h1 style="font-size: 32px">Your account is being verified.</h1> 
        <p style="font-size: 18px">To activate your account after completing registration, please simply click on the link.</p>
        <p style="font-size: 12px">For this you have 24 hours from the date of registration.</p>
        <hr>
        <a href="http://localhost:3000/api/activate?token=${token}">Complete registration</a>`
    };
    mailer(mail);

    NewUsers.create({jwt: token})
      .then(row => {
        req.flash("success", "To activate your account, follow the link in the letter sent to your mail.");
        res.redirect("/login")
      })
      .catch(err => {
        console.error(err);
        req.flash("error", err.message);
        res.redirect("/signup")
      })

  } catch (e) {
    console.error(e);
    res.redirect("/signup")
  }
};

indexRouter.login = async (req, res) => {
  let accessToken = await jwtoken.refresh(req.user);

  req.flash("info", `Welcome, mister ${req.user.firstname} ${req.user.lastname}`);
  res.cookie("jwt.sid", accessToken).redirect("/project");
};


// PUT
indexRouter.userUpdate = async (req, res) => {
  let user                = await Users.findOne({where: {id: req.body.id}});
  let social              = await UserSocials.findOne({where: {id_user: user.id}});
  req.body.user.firstname = req.body.user.firstname.toLowerCase();
  req.body.user.lastname  = req.body.user.lastname.toLowerCase();

  await user.update(req.body.user);
  await social.update(req.body.social);
  res.redirect("back")
};


module.exports = indexRouter;