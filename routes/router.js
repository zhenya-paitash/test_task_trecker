const
  index         = require("express").Router({mergeParams: true}),
  project       = require("express").Router({mergeParams: true}),
  indexRouter   = require("./index-router"),
  projectRouter = require("./project-router"),
  M             = require("../middleware/middleware"),
  V             = require("../middleware/validator");


// ======================================== INDEX =================================================
// "/"
index.get("/",              M.login,                   indexRouter.mainPage);
index.get("/signup",        M.lgout,                   indexRouter.signupPage);
index.get("/login",         M.lgout,                   indexRouter.loginPage);
index.get("/logout",        M.login,                   indexRouter.logout);
index.get("/user",          M.login,                   indexRouter.userSearchPage);
index.get("/user/:id_user", M.login,          V.usrch, indexRouter.userPage);
index.get("/api/activate",                             indexRouter.activate);
index.post("/signup",       M.lgout,          V.sgnup, indexRouter.signup);
index.post("/login",        M.lgout, M.uauth,          indexRouter.login);
index.put("/user/:id_user", M.login, M.profl, V.usupd, indexRouter.userUpdate);



// ======================================== PROJECT ===============================================
// "/project"
project.get("/",                                           M.login,                   projectRouter.projectAllPage);
project.get("/:id_project",                                M.login,          V.pjspg, projectRouter.projectSinglePage);
project.get("/:id_project/:id_task",                       M.login,          V.tkspg, projectRouter.projectTaskPage);
project.post("/createproject",                             M.login, M.pjcrt, V.pjcrt, projectRouter.createProject);
project.post("/:id_project/adduser",                       M.login, M.pjusr,          projectRouter.addUserProject);
project.post("/:id_project/createtask",                    M.login, M.tkcrt, V.tkcrt, projectRouter.createTask);
project.post("/:id_project/:id_task/adduser",              M.login, M.tkusr,          projectRouter.addUserTask);
project.post("/:id_project/:id_task/createcomment",        M.login, M.cmcrt, V.cmcrt, projectRouter.createComment);
project.put("/:id_project/:id_task/status",                M.login, M.tkstu, V.tksts, projectRouter.changeStatusTask);
project.put("/:id_project/:id_task/:id_comment/edit",      M.login, M.cmedt,          projectRouter.editComment);
project.delete("/:id_project/:id_task/:id_comment/delete", M.login, M.cmdel,          projectRouter.deleteComment);



module.exports = {
  index,
  project
};