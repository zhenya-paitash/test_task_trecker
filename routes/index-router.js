let
  indexRouter   = require("express").Router(),
  db            = require("../config/database"),
  Sequelize     = require("sequelize"),
  Op            = Sequelize.Op,
  bcrypt        = require("bcrypt"),
  passport      = require("passport"),

  Users         = require("../models/user-model"),
  UserRoles     = require("../models/userrole-model"),
  UserSocials   = require("../models/usersocial-model"),
  ProjectUsers  = require("../models/projectuser-model"),
  TaskUsers     = require("../models/taskuser-model"),
  Comments      = require("../models/comment-model");


// GET
indexRouter.mainPage = (req, res) => {res.redirect("/project")};
indexRouter.signupPage = (req, res) => {res.render("index/signup")};
indexRouter.loginPage = (req, res) => {res.render("index/login")};
indexRouter.logout = (req, res) => {req.logOut();res.redirect("/login")};

// /user || /user?search=pedro
indexRouter.userSearchPage = async (req, res) => {
  let search = req.query.search;
  search  ? search = search.toLowerCase() : search = "example";
  let firstnameResult = await Users.findAll({where: {firstname: { [Op.like]: "%" + search + "%" } }});
  let lastnameResult = await Users.findAll({where: {lastname: { [Op.like]: "%" + search + "%" } }});

  Users.findAll({ order: [ [ 'lastname', 'ASC' ] ]})
    .then(users => res.render("index/usersearch", {
      search,
      users,
      firstnameResult,
      lastnameResult
    }))
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    })
};

// /user/:id_user
indexRouter.userPage = (req, res) => {
  let id_user = Number(req.params.id_user);
  if (id_user && !isNaN(id_user)) {
    Users.findOne({ where: { id: req.params.id_user } })
      .then(async (user) => {
        if (user) {

          let social        = await  UserSocials.findOne({where: {id_user: user.id}});

          let userProjects  = await ProjectUsers.findAll({where: {id_user: user.id}});
          let userTasks     = await TaskUsers.findAll({where: {id_user: user.id}});
          let userComments  = await Comments.findAll({where: {author: user.id}});
          UserRoles.findOne({where: {id: user.role}})
            .then(role =>
              res.render("index/user", {
                user,
                role,
                social,
                userProjects,
                userTasks,
                userComments
              })
            )
            .catch(err => {
              console.error(err);
              req.flash("error", err.message);
              res.redirect("back")
            })
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
  } else {
    req.flash("info", "User with this ID not found!");
    res.redirect('/user')
  }
};

// POST
indexRouter.signup = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = {
      email: req.body.email.toLowerCase(),
      firstname: req.body.firstname.toLowerCase(),
      lastname: req.body.lastname.toLowerCase(),
      password: hashPassword,
      role: req.body.role
    };
    // console.log(newUser);
    Users.create(newUser)
      .then(async user => {
        // console.log(user);

        await UserSocials.create({id_user: user.id});

        res.redirect("/login")
      })
      .catch(err => {
        req.flash("error", "User with this email is already registered");
        res.redirect("/signup")
      });
  } catch (e) {
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

  //TODO проверки validator
  let user    = await Users.findOne({where: {id: req.body.id}});
  let social  = await UserSocials.findOne({where: {id_user: user.id}});

  await user.update(req.body.user);
  await social.update(req.body.social);

  res.redirect("back")
};


module.exports = indexRouter;