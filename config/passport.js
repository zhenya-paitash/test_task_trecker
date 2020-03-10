let
  LocalStrategy = require("passport-local").Strategy,
  bcrypt        = require("bcrypt");


function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, {message: "Sorry, check email field"})
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, {message: "Sorry, check password field"})
      }
    } catch (e) {
      return done(e)
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}


module.exports = initialize;