let
  indexRouter  = require("express").Router(),
  Sequelize    = require("sequelize"),
  Op           = Sequelize.Op,
  bcrypt       = require("bcrypt"),
  passport     = require("passport"),

  Users        = require("../models/user-model"),
  UserRoles    = require("../models/userrole-model"),
  UserSocials  = require("../models/usersocial-model"),
  ProjectUsers = require("../models/projectuser-model"),
  TaskUsers    = require("../models/taskuser-model"),
  Comments     = require("../models/comment-model");


// GET
indexRouter.mainPage   = (req, res) => res.redirect("/project");
indexRouter.signupPage = (req, res) => res.render("index/signup", {title:"SIGN UP"});
indexRouter.loginPage  = (req, res) => res.render("index/login", {title:"LOGIN"});
indexRouter.logout     = (req, res) => {req.logOut(); res.redirect("/login")};
// /user
indexRouter.userSearchPage = async (req, res) => {
  let search = req.query.search;
  if (search) search = search.toLowerCase();

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

// POST
indexRouter.signup = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = {
      email:     req.body.email.toLowerCase(),
      firstname: req.body.firstname.toLowerCase(),
      lastname:  req.body.lastname.toLowerCase(),
      password:  hashPassword,
      role:      req.body.role
    };

    Users.create(newUser)
      .then(async user => {
        await UserSocials.create({id_user: user.id});
        res.redirect("/login")
      })
      .catch(err => {
        req.flash("error", "User with this email is already registered");
        res.redirect("/signup")
      });

  } catch (e) {
    console.error(e);
    res.redirect("/signup")
  }
};


indexRouter.login = passport.authenticate("local", {
  successRedirect: "/project",
  failureRedirect: "/login",
  failureFlash: true
});


// PUT
indexRouter.userUpdate = async (req, res) => {
  let user   = await Users.findOne({where: {id: req.body.id}});
  let social = await UserSocials.findOne({where: {id_user: user.id}});
  req.body.user.firstname = req.body.user.firstname.toLowerCase();
  req.body.user.lastname = req.body.user.lastname.toLowerCase();
  await user.update(req.body.user);
  await social.update(req.body.social);
  res.redirect("back")
};


module.exports = indexRouter;