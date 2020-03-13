let
  M         = {},
  UserRoles = require("../models/userrole-model"),
  Comments  = require("../models/comment-model");


// LOGIN or NOT LOGIN CHECK

// check if the user is logged in
M.login = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash("info", "You need be login.");
  res.redirect("/login")
};

// check if the user NOT is logged in
M.lgout = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  req.flash("info", "You are already logged in.");
  res.redirect("/project")
};


// CHECK PROP

// checking if the user has the right to edit the profile
M.profile = (req, res, next) => {
  if (Number(req.user.id) === Number(req.body.id)) {
    return next()
  }
  req.flash("info", "Access denied!");
  res.redirect("back")
};


// TODO объединить в одну
M.pjcrt = async (req, res, next) => {
  let prop = await UserRoles.findOne({where: {id: req.user.role}});
  if (prop.project_create) {
    return next()
  }
  req.flash("error", "You do not have access to this action!");
  res.redirect("back")
};


M.pjusr = async (req, res, next) => {
  let prop = await UserRoles.findOne({where: {id: req.user.role}});
  if (prop.project_users) {
    return next()
  }
  req.flash("error", "You do not have access to this action!");
  res.redirect("back")
};


M.tkcrt = async (req, res, next) => {
  let prop = await UserRoles.findOne({where: {id: req.user.role}});
  if (prop.task_create) {
    return next()
  }
  req.flash("error", "You do not have access to this action!");
  res.redirect("back")
};


M.tkusr = async (req, res, next) => {
  let prop = await UserRoles.findOne({where: {id: req.user.role}});
  if (prop.task_users) {
    return next()
  }
  req.flash("error", "You do not have access to this action!");
  res.redirect("back")
};


M.tkstu = async (req, res, next) => {
  let prop = await UserRoles.findOne({where: { id: req.user.role }});
  if (req.isAuthenticated() && prop.task_status) {
    return next()
  }
  req.flash("error", "You do not have access to this action!");
  res.redirect("back")
};


M.cmcrt = async (req, res, next) => {
  let prop = await UserRoles.findOne({where: {id: req.user.role}});
  if (prop.comment_create) {
    return next()
  }
  req.flash("error", "You do not have access to this action!");
  res.redirect("back")
};


M.cmaut = async (req, res, next) => {
  let prop = await UserRoles.findOne({where: {id: req.user.role}});
  let comment = await Comments.findOne({where: {id: req.params.id_comment}});
  if (Number(req.user.id) === comment.author && prop.comment_edit && prop.comment_delete) {
    return next()
  }
  req.flash("error", "You do not have access to this action!");
  res.redirect("back")
};





// async function whatPropCheck(req, res, next, what) {
//     M.login;
//     let prop = await UserRoles.findOne({where: { id: req.user.role }});
//   if (prop[what]) {
//     return next()
//   }
//   req.flash("error", "You do not have access to this action!");
//   res.redirect("back")
// }


module.exports = M;