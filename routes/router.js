const
  index           = require("express").Router({mergeParams: true}),
  project         = require("express").Router({mergeParams: true}),
  indexRouter     = require("./index-router"),
  projectRouter   = require("./project-router");


// ======================================== INDEX =================================================
// "/"
index.get("/",                indexRouter.mainPage);
index.get("/signup",          indexRouter.signupPage);
index.get("/login",           indexRouter.loginPage);
index.get("/logout",          indexRouter.logout);
index.get("/user",            indexRouter.userSearchPage);
index.get("/user/:id_user",   indexRouter.userPage);
index.post("/signup",         indexRouter.signup);
index.post("/login",          indexRouter.login);



// ======================================== PROJECT ===============================================
// "/project"
project.get("/",                      projectRouter.projectAllPage);
project.get("/:id_project",           projectRouter.projectSinglePage);
project.get("/:id_project/:id_task",  projectRouter.projectTaskPage);



module.exports = {
  index,
  project
};