let
  indexRouter   = require("express").Router(),
  loacldb       = require("../local_db"),
  db            = require("../config/database"),
  Sequelize     = require("sequelize"),
  Op            = Sequelize.Op,
  Users         = require("../models/user-model"),
  UserRoles     = require("../models/userrole-model"),
  Projects      = require("../models/project-model"),
  ProjectUsers  = require("../models/projectuser-model"),
  Tasks         = require("../models/task-model"),
  TaskUsers     = require("../models/taskuser-model"),
  Comments      = require("../models/comment-model");


// ======================================== GET ========================================
indexRouter.mainPage = (req, res) => {res.redirect("/login")};
indexRouter.signupPage = (req, res) => {res.render("user/signup")};
indexRouter.loginPage = (req, res) => {res.render("user/login")};
indexRouter.userSearchPage = (req, res) => {res.render("user/search", {search: req.query.search})};
indexRouter.userPage = (req, res) => {res.render("user/user", {id: req.params.id_user})};

indexRouter.pgDb = (req, res) => {
  Users.findAll()
    .then(users => {
      console.log(users);
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
};
indexRouter.pgCreate = (req, res) => {
  let data = {
    firstname: "John",
    surname: "Doe",
    password: "123",
    email: "asd2@gmail.com",
    role: 1
  };
  Users.create(data)
    .then(user => res.redirect("/pg"))
    .catch(e=>console.log(e))
};
indexRouter.pgFind = (req, res) => {
  Users.findAll({where: {password: { [Op.like]: "%" + "23" + "%" } }})
    .then(data => {console.log(data);res.send(data)})
  // db.query("SELECT * FROM users WHERE id=2;")
  //   .then(done => console.log(done))
};

// ======================================== POST ========================================
indexRouter.signup = (req, res) => {
  res.redirect("/project")
};
indexRouter.login = (req, res) => {
  res.redirect("/project")
};
indexRouter.logout = (req, res) => {
  // req.logout();
  res.redirect("back")
};



module.exports = indexRouter;