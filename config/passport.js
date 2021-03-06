let
  LocalStrategy = require("passport-local").Strategy,
  bcrypt        = require("bcrypt"),
  Users         = require("../models").User;
  // Users         = require("../old-models/done/user-model");


function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await Users.findOne({ where: { email: email }});
    if (user === null) return done(null, false, {message: "Check email."});

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, {message: "Check password."})
      }
    } catch (e) {
      return done(e)
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    Users.findOne({where: {id: id}})
      .then(user => done(null, user))
      .catch(err => done(err))
  });
}


module.exports = initialize;