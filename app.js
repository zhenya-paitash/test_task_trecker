// IMPORTS
let
  express         = require("express"),
  session         = require("express-session"),
  // Sequelize       = require("sequelize"),
  // pg              = require("pg"),
  // pgHstore        = require("pg-hstore"),
  passport        = require("passport"),
  bodyParser      = require("body-parser"),
  cookieParser    = require("cookie-parser"),
  flash           = require("connect-flash"),
  methodOverride  = require("method-override"),
  config          = require("./config/myConfig"),
  passportInit    = require("./config/passport"),
  // db              = require("./config/database"),
  router          = require("./routes/router"),
  // database_init   = require("./database_init"),
  app             = express();


// TEST PostgeSQL CONNECTION
// db.authenticate()
//   .then(() => console.log("\x1b[32m%s\x1b[0m", "DB connected..."))
//   // .then(db.sync({force: false}))
//   // .then(database_init.create())
//   .catch(err => console.error(err));


// PASSPORT initialize
passportInit(passport);


// SETUP APP
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // If you do not want redis to eat all the RAM in a couple of years,
  // you need to take care of the timely deletion of session data.
  // The maxAge parameter is responsible for this, which equally sets this value
  // for both the cookie and the value stored in redis.
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));
app.use((req, res, next) => {
  console.log("\x1b[34m%s\x1b[0m",
    `${new Date().toLocaleTimeString()}, ip: ${req.ip}, method: ${req.method}, URL: ${req.originalUrl}`);
  res.locals.currentUser  = req.user;
  res.locals.success      = req.flash("success");
  res.locals.error        = req.flash("error");
  res.locals.info         = req.flash("info");
  next();
});


// ROUTES
app.use("/",        router.index);
app.use("/project", router.project);
// 404
app.use((req, res) => res.status(404).send("<h1><a href='/'>404, NOT FOUND</a></h1>"));


// START APP
app.listen(process.env.PORT, process.env.IP, config.status());
