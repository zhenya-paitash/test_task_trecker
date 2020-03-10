let
  M           = {},
  validator   = require("express-validator");


M.login = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  req.flash("info", "You need be login");
  res.redirect("/login")
};


// function userProp(req, res, next) {
//   let userRole = req.user.role;
//   UserRoles.findOne({where: {id: userRole}})
//     .then(prop => {
//       console.log(prop);
//       next(prop)
//     })
//     .catch(err => {
//       req.flash("error", err.message);
//       res.redirect("/login")
//     })
// }

module.exports = M;