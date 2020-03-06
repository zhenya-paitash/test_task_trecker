let
  userRouter   = require("express").Router(),
  db            = require("../../config/database"),
  Sequelize     = require("sequelize"),
  Op            = Sequelize.Op,

  Users         = require("../../models/user-model"),
  UserRoles     = require("../../models/userrole-model"),
  Projects      = require("../../models/project-model"),
  ProjectUsers  = require("../../models/projectuser-model"),
  Tasks         = require("../../models/task-model"),
  TaskUsers     = require("../../models/taskuser-model"),
  Comments      = require("../../models/comment-model");


// ======================================== GET ========================================
userRouter.mainPage = (req, res) => {res.redirect("/login")};
userRouter.signupPage = (req, res) => {res.render("user/signup")};
userRouter.loginPage = (req, res) => {res.render("user/login")};
userRouter.userSearchPage = (req, res) => {res.render("user/search", {search: req.query.search})};
userRouter.userPage = (req, res) => {res.render("user/user", {id: req.params.id_user})};

// userRouter.pgDb = (req, res) => {
//   Users.findAll()
//     .then(users => {
//       console.log(users);
//       res.sendStatus(200)
//     })
//     .catch(err => console.log(err))
// };
// userRouter.pgCreate = (req, res) => {
//   let data = {
//     firstname: "John",
//     surname: "Doe",
//     password: "123",
//     email: "asd2@gmail.com",
//     role: 1
//   };
//   Users.create(data)
//     .then(user => res.redirect("/pg"))
//     .catch(e=>console.log(e))
// };
// userRouter.pgFind = (req, res) => {
//   Users.findAll({where: {password: { [Op.like]: "%" + "23" + "%" } }})
//     .then(data => {console.log(data);res.send(data)})
//   // db.query("SELECT * FROM users WHERE id=2;")
//   //   .then(done => console.log(done))
// };

// ======================================== POST ========================================
userRouter.signup = (req, res) => {res.redirect("/project")};
userRouter.login = (req, res) => {res.redirect("/project")};
userRouter.logout = (req, res) => {
  // req.logout();
  res.redirect("back")
};



module.exports = userRouter;