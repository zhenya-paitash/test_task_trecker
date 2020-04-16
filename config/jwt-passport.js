let
  LocalStrategy = require("passport-local").Strategy,
  bcrypt        = require("bcrypt"),
  Users         = require("../models").User;
  // Users         = require("../old-models/done/user-model");
const
  JwtStrategy   = require('passport-jwt').Strategy,
  ExtractJwt    = require('passport-jwt').ExtractJwt;


// function initialize(passport) {
//   const authenticateUser = async (email, password, done) => {
//     const user = await Users.findOne({ where: { email: email }});
//     if (user === null) return done(null, false, {message: "Check email."});
//
//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user)
//       } else {
//         return done(null, false, {message: "Check password."})
//       }
//     } catch (e) {
//       return done(e)
//     }
//   };
//
//   passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     Users.findOne({where: {id: id}})
//       .then(user => done(null, user))
//       .catch(err => done(err))
//   });
// }

function initialize(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SESSION_SECRET;

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    Users.findOne({ where: { id: jwt_payload.id }})
      .then(user => done(null, user))
      .catch(error => done(error, null));

    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });
  }));

  
  // const authenticateUser = async (email, password, done) => {
  //   const user = await Users.findOne({ where: { email: email }});
  //   if (user === null) return done(null, false, {message: "Check email."});
  //
  //   try {
  //     if (await bcrypt.compare(password, user.password)) {
  //       return done(null, user)
  //     } else {
  //       return done(null, false, {message: "Check password."})
  //     }
  //   } catch (e) {
  //     return done(e)
  //   }
  // };
  //
  // passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  // passport.serializeUser((user, done) => done(null, user.id));
  // passport.deserializeUser((id, done) => {
  //   Users.findOne({where: {id: id}})
  //     .then(user => done(null, user))
  //     .catch(err => done(err))
  // });
}




module.exports = initialize;