// IMPORTS
let
  express         = require("express"),
  exSession       = require("express-session"),
  Sequelize       = require("sequelize"),
  pg              = require("pg"),
  pgHstore        = require("pg-hstore"),
  // passport        = require("passport"),
  // LocalStrategy   = require("passport-local"),
  bodyParser      = require("body-parser"),
  flash           = require("connect-flash"),
  methodOverride  = require("method-override"),
  config          = require("./config/config"),
  db              = require("./config/database"),
  router          = require("./routes/router"),
  database_init   = require("./database_init"),
  app             = express();


// TEST PostgeSQL CONNECTION
db.authenticate()
  .then(() => console.log("\x1b[32m%s\x1b[0m", "DB connected..."))
  // .then(db.sync({force: false}))
  .then(database_init.create())
  .catch(err => console.error(err));


// SETUP APP
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({
  secret: "123",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(methodOverride("_method"));
app.use((req, res, next) => {
  res.locals.currentUser  = req.user;
  res.locals.done         = req.flash("done");
  res.locals.error        = req.flash("error");
  next();
});


// ROUTES
app.use("/",                                          router.index);
app.use("/project",                                   router.project);
app.use("/project/",                                  router.task);
app.use("/project/:id_project",                       router.comment);



// START APP
app.listen(process.env.PORT, process.env.IP, config.status());

