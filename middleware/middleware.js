let
  M         = {},
  UserRoles = require("../models/userrole-model"),
  Comments  = require("../models/comment-model");


// LOGIN or NOT LOGIN CHECK
// check if the user is LOGGED IN
M.login = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash("info", "You need be login.");
  res.redirect("/login")
};

// check if the user NOT is LOGGED IN
M.lgout = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  req.flash("info", "You are already logged in.");
  res.redirect("/project")
};

// checking if the user has the right to EDIT the PROFILE
M.profl = (req, res, next) => {
  if (Number(req.user.id) === Number(req.body.id)) {
    return next()
  }
  req.flash("error", "Access denied!");
  res.redirect("back")
};


// permission checks
M.pjcrt = (req, res, next) => propCheck(req, res, next, "project_create");
M.pjusr = (req, res, next) => propCheck(req, res, next, "project_users");
M.tkcrt = (req, res, next) => propCheck(req, res, next, "task_create");
M.tkusr = (req, res, next) => propCheck(req, res, next, "task_users");
M.tkstu = (req, res, next) => propCheck(req, res, next, "task_status");
M.cmcrt = (req, res, next) => propCheck(req, res, next, "comment_create");
M.cmedt = (req, res, next) => propCheck(req, res, next, "comment_edit");
M.cmdel = (req, res, next) => propCheck(req, res, next, "comment_delete");

async function propCheck(req, res, next, callback) {
  let prop = await UserRoles.findOne({where: {id: req.user.role}});
  if (prop[callback]) {
    return next()
  }

  req.flash("error", "You do not have access to this action!");
  res.redirect("back")
}


module.exports = M;