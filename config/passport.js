let
  LocalStrategy = require("passport-local").Strategy,
  bcrypt        = require("bcrypt"),
  Users         = require("../models/user-model");


function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    // const user = email => user.email === email;
    const user = await Users.findOne({ where: { email: email }});
    if (user === null) {
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
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    Users.findOne({where: {id: id}})
      .then(user => done(null, user))
  });
}


module.exports = initialize;