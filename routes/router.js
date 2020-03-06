let
  index         = require("express").Router(),
  project       = require("express").Router({mergeParams: true}),
  task          = require("express").Router({mergeParams: true}),
  comment       = require("express").Router({mergeParams: true}),
  indexRouter   = require("./index-router"),
  projectRouter = require("./project-router"),
  taskRouter    = require("./task-router"),
  commentRouter = require("./comment-router");



// ======================================== INDEX =================================================
// ../
index.get("/",              indexRouter.mainPage);
index.get("/signup",        indexRouter.signupPage);
index.get("/login",         indexRouter.loginPage);
index.get("/logout",        indexRouter.logout);
index.get("/user",          indexRouter.userSearchPage);
index.get("/user/:id_user", indexRouter.userPage);

index.get("/pg",            indexRouter.pgDb);
index.get("/pg/create",     indexRouter.pgCreate);
index.get("/pg/find",       indexRouter.pgFind);

index.post("/signup",       indexRouter.signup);
index.post("/login",        indexRouter.login);
// index.post("/logout",       indexRouter.logout);


// ======================================== PROJECT ===============================================
// ../project/
project.get("/",                        projectRouter.projectPage);
// project.get("/create",                  projectRouter.createProjectPage);
// project.get("/:id_project/edit",        projectRouter.editProjectPage);
// project.post("/create",                 projectRouter.createProject);
// project.put("/:id_project/edit",        projectRouter.editProject);
// project.delete("/:id_project/delete",   projectRouter.deleteProject);


// ======================================== TASK ==================================================
// ../project/:id_project/
task.get("/:id_task", (req, res) => {res.render("project/project")});
// task.get("/create",               taskRouter.createTaskPage);
// task.get("/:id_task/edit",        taskRouter.editTaskPage);
// task.post("/create",              taskRouter.createTask);
// task.put("/:id_task/edit",        taskRouter.editTask);
// task.delete("/:id_task/delete",   taskRouter.deleteTask);


// ======================================== COMMENT ===============================================
// ../project/:id_project/task/:id_task/comment/
comment.get("/:id_task", (req, res)=>{res.render("project/task")});
// comment.get("/create",                  commentRouter.createCommentPage);
// comment.get("/:id_comment/edit",        commentRouter.editCommentPage);
// comment.post("/create",                 commentRouter.createComment);
// comment.put("/:id_comment/edit",        commentRouter.editComment);
// comment.delete("/:id_comment/delete",   commentRouter.deleteComment);



module.exports = {index, project, task, comment};