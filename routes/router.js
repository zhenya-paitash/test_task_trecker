const
  index           = require("express").Router({mergeParams: true}),
  project         = require("express").Router({mergeParams: true}),
  indexRouter     = require("./index-router"),
  projectRouter   = require("./project-router");

const M           = require("../middleware/middleware");


// ======================================== INDEX =================================================
// "/"
index.get("/",                M.login,indexRouter.mainPage);
index.get("/signup",          indexRouter.signupPage);
index.get("/login",           indexRouter.loginPage);
index.get("/logout",          M.login,indexRouter.logout);
index.get("/user",            M.login,indexRouter.userSearchPage);
index.get("/user/:id_user",   M.login,indexRouter.userPage);

index.get("/id", (req, res) => res.send(req.user));
index.get("/prop", projectRouter.userProp);

index.post("/signup",         indexRouter.signup);
index.post("/login",          indexRouter.login);

index.put("/user/:id_user",   M.login,indexRouter.userUpdate);



// ======================================== PROJECT ===============================================
// "/project"
project.get("/",                                            M.login, projectRouter.projectAllPage);
project.get("/:id_project",                                 M.login, projectRouter.projectSinglePage);
project.get("/:id_project/:id_task",                        M.login, projectRouter.projectTaskPage);

project.post("/createproject",                              projectRouter.createProject);
project.post("/:id_project/adduser",                        projectRouter.addUserProject);
project.post("/:id_project/createtask",                     projectRouter.createTask);
project.post("/:id_project/:id_task/adduser",               projectRouter.addUserTask);
project.post("/:id_project/:id_task/createcomment",         projectRouter.createComment);
project.put("/:id_project/:id_task/status",                 projectRouter.changeStatusTask);
project.put("/:id_project/:id_task/:id_comment/edit",       projectRouter.editComment);
project.delete("/:id_project/:id_task/:id_comment/delete",  projectRouter.deleteComment);



module.exports = {
  index,
  project
};