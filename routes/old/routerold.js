let
  index         = require("express").Router(),
  // project       = require("express").Router({mergeParams: true}),
  // task          = require("express").Router({mergeParams: true}),
  // comment       = require("express").Router({mergeParams: true}),
  userRouter   = require("./user-router"),
  // projectRouter = require("./project-router"),
  // taskRouter    = require("./task-router"),
  // commentRouter = require("./comment-router");



// ======================================== INDEX =================================================
// ../
index.get("/",              userRouter.mainPage);
// user.get("/signup",        userRouter.signupPage);
// user.get("/login",         userRouter.loginPage);
// user.get("/logout",        userRouter.logout);
// user.get("/user",          userRouter.userSearchPage);
// user.get("/user/:id_user", userRouter.userPage);

// user.get("/pg",            userRouter.pgDb);
// user.get("/pg/create",     userRouter.pgCreate);
// user.get("/pg/find",       userRouter.pgFind);

// user.post("/signup",       userRouter.signup);
// user.post("/login",        userRouter.login);
// user.post("/logout",       userRouter.logout);


// ======================================== PROJECT ===============================================
// ../project/
// project.get("/",                        projectRouter.projectPage);
// project.get("/create",                  projectRouter.createProjectPage);
// project.get("/:id_project/edit",        projectRouter.editProjectPage);
// project.post("/create",                 projectRouter.createProject);
// project.put("/:id_project/edit",        projectRouter.editProject);
// project.delete("/:id_project/delete",   projectRouter.deleteProject);


// ======================================== TASK ==================================================
// ../project/:id_project/
// task.get("/:id_task", (req, res) => {res.render("project/project")});
// task.get("/create",               taskRouter.createTaskPage);
// task.get("/:id_task/edit",        taskRouter.editTaskPage);
// task.post("/create",              taskRouter.createTask);
// task.put("/:id_task/edit",        taskRouter.editTask);
// task.delete("/:id_task/delete",   taskRouter.deleteTask);


// ======================================== COMMENT ===============================================
// ../project/:id_project/task/:id_task/comment/
// comment.get("/:id_task", (req, res)=>{res.render("project/task")});
// comment.get("/create",                  commentRouter.createCommentPage);
// comment.get("/:id_comment/edit",        commentRouter.editCommentPage);
// comment.post("/create",                 commentRouter.createComment);
// comment.put("/:id_comment/edit",        commentRouter.editComment);
// comment.delete("/:id_comment/delete",   commentRouter.deleteComment);



module.exports = {user, project};