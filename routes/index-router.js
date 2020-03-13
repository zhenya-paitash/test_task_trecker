let
  indexRouter   = require("express").Router(),
  // db            = require("../config/database"),
  Sequelize     = require("sequelize"),
  Op            = Sequelize.Op,
  bcrypt        = require("bcrypt"),
  passport      = require("passport"),
  validator     = require("validator"),

  Users         = require("../models/user-model"),
  UserRoles     = require("../models/userrole-model"),
  UserSocials   = require("../models/usersocial-model"),
  ProjectUsers  = require("../models/projectuser-model"),
  TaskUsers     = require("../models/taskuser-model"),
  Comments      = require("../models/comment-model");


// GET
indexRouter.mainPage    = (req, res) => res.redirect("/project");
indexRouter.signupPage  = (req, res) => res.render("index/signup");
indexRouter.loginPage   = (req, res) => res.render("index/login");
indexRouter.logout      = (req, res) => {req.logOut();res.redirect("/login")};
// /user
indexRouter.userSearchPage = async (req, res) => {
  let search = req.query.search;
  search ? search = search.toLowerCase() : search = "example";
  let firstnameResult = await Users.findAll({where: {firstname: { [Op.like]: "%" + search + "%" } }});
  let lastnameResult  = await Users.findAll({where: {lastname: { [Op.like]: "%" + search + "%" } }});

  Users.findAll({ order: [ [ 'lastname', 'ASC' ] ]})
    .then(users => res.render("index/usersearch", {search, users, firstnameResult, lastnameResult}))
    .catch(err => {
      console.error(err);
      req.flash("error", err.message);
      res.redirect("back")
    });
};

// /user/:id_user
indexRouter.userPage = (req, res) => {
  // console.log(validator.isNumeric(req.params.id_user));
  // console.log(!validator.isEmpty(req.params.id_user));
  // if (!validator.isEmpty(req.params.id_user) && validator.isNumeric(req.params.id_user)) {}
  let id_user = Number(req.params.id_user);
  if (id_user && !isNaN(id_user)) {
    Users.findOne({ where: { id: req.params.id_user } })
      .then(async (user) => {
        if (user) {
          let social        = await  UserSocials.findOne({where: {id_user: user.id}});
          let userProjects  = await ProjectUsers.findAll({where: {id_user: user.id}});
          let userTasks     = await TaskUsers.findAll({where: {id_user: user.id}});
          let userComments  = await Comments.findAll({where: {author: user.id}});
          let role          = await UserRoles.findOne({where: {id: user.role}});
          res.render("index/user", {user, role, social, userProjects, userTasks, userComments})
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
    req.flash("info", "Check ID field");
    res.redirect('/user')
  }
};

// POST
indexRouter.signup = async (req, res) => {
  try {
    let
      email     = req.body.email.toLowerCase(),
      firstname = req.body.firstname.toLowerCase(),
      lastname  = req.body.lastname.toLowerCase(),
      password  = req.body.password,
      role      = req.body.role,
      emlpattern = /[a-z0-9]+([-+._][a-z0-9]+){0,2}@.*?(\.(a(?:[cdefgilmnoqrstuwxz]|ero|(?:rp|si)a)|b(?:[abdefghijmnorstvwyz]iz)|c(?:[acdfghiklmnoruvxyz]|at|o(?:m|op))|d[ejkmoz]|e(?:[ceghrstu]|du)|f[ijkmor]|g(?:[abdefghilmnpqrstuwy]|ov)|h[kmnrtu]|i(?:[delmnoqrst]|n(?:fo|t))|j(?:[emop]|obs)|k[eghimnprwyz]|l[abcikrstuvy]|m(?:[acdeghklmnopqrstuvwxyz]|il|obi|useum)|n(?:[acefgilopruz]|ame|et)|o(?:m|rg)|p(?:[aefghklmnrstwy]|ro)|qa|r[eosuw]|s[abcdeghijklmnortuvyz]|t(?:[cdfghjklmnoprtvwz]|(?:rav)?el)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\b){1,2}/,
      paspattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/;

    if (validator.matches(email, emlpattern)
      && validator.matches(password, paspattern)
      && !validator.isEmpty(firstname) && firstname !== " "
      && !validator.isEmpty(lastname)&& lastname !== " "
      && validator.isNumeric(role)) {

      const hashPassword = await bcrypt.hash(password, 10);
      let newUser = {email, firstname, lastname, password: hashPassword, role};

      Users.create(newUser)
        .then(async user => {
          await UserSocials.create({id_user: user.id});
          res.redirect("/login")
        })
        .catch(err => {
          req.flash("error", "User with this email is already registered");
          res.redirect("/signup")
        });

    } else {
      req.flash("error", "Invalid form");
      res.redirect("/signup")
    }
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
  if (!validator.isEmpty(req.body.user.firstname) && req.body.user.firstname !== " "
    && !validator.isEmpty(req.body.user.lastname) && req.body.user.lastname !== " ") {
    let user    = await Users.findOne({where: {id: req.body.id}});
    let social  = await UserSocials.findOne({where: {id_user: user.id}});
    await user.update(req.body.user);
    await social.update(req.body.social);
    res.redirect("back")

  } else {
    req.flash("error", "Invalid form");
    res.redirect("back")
  }
};


module.exports = indexRouter;