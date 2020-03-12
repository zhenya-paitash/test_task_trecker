let
  M           = {};

// check if the user is logged in
M.login = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  req.flash("info", "You need be login.");
  res.redirect("/login")
};

// check if the user NOT is logged in
M.logout = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }

  req.flash("info", "You are already logged in.");
  res.redirect("/project")
};

// checking if the user has the right to edit the profile
M.profile = (req, res, next) => {
  if (req.isAuthenticated() && Number(req.user.id) === Number(req.body.id)) {
    return next()
  }

  req.flash("info", "Access denied!");
  res.redirect("back")
};


module.exports = M;