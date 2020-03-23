let
  M         = {},
  jwt       = require("jsonwebtoken"),
  jwtoken   = require("./jwtoken"),
  cookie    = require("cookie-parser"),
  passport  = require("passport"),
  Users     = require("../models/user-model"),
  UserRoles = require("../models/userrole-model"),
  Comments  = require("../models/comment-model");


// LOGIN or NOT LOGIN CHECK

M.login = async (req, res, next) => {
  if(req.isAuthenticated()) {
    let token = req.cookies["jwt.sid"];
    if(token) {
      // token = decrypt(token);
      jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, {}, async (er,data)=> {
        if(!er) {
          return next()
        }

        if (er instanceof jwt.TokenExpiredError) {
          try {
            const refreshToken = jwtoken.decrypt(req.user.rft);
            jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN,
              async (err,usr) => {
                if (err || usr.id !== req.user.id) {
                  if (err instanceof jwt.TokenExpiredError) {
                    req.flash("info", "You have been away for too long.");
                  } else {
                    req.flash("error", "Data does not match.");
                  }
                  req.logOut();
                  res.clearCookie("jwt.sid");
                  return res.status(403).redirect("/login")
                } else {
                  const accessToken = await jwtoken.refresh(req.user);
                  res.cookie("jwt.sid", accessToken);
                  return next();
                }
              });

          } catch (e) {
            req.logOut();
            req.flash("error", "Something went wrong...");
            res.clearCookie("jwt.sid");
            return res.status(403).redirect("/login")
          }
        } else {
          req.logOut();
          req.flash("info", "Your session has expired, please login.");
          res.clearCookie("jwt.sid");
          return res.redirect("/login")
        }

      });
    } else {
      req.logOut();
      req.flash("error", "Something is wrong with the token ...");
      res.clearCookie("jwt.sid");
      res.redirect("/login")
    }

  } else {
    req.flash("info", "You need be login.");
    res.clearCookie("jwt.sid");
    res.redirect("/login")
  }
};


// check if the user NOT is LOGGED IN
M.lgout = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  req.flash("info", "You are already logged in.");
  res.redirect("back")
};


// checking if the user has the right to EDIT the PROFILE
M.profl = (req, res, next) => {
  if (Number(req.user.id) === Number(req.body.id)) {
    return next()
  }
  req.flash("error", "Access denied!");
  res.redirect("back")
};


M.uauth = passport.authenticate("local", {
  // successRedirect: "/project",
  failureRedirect: "/login",
  failureFlash: true
});


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