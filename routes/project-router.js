let
  projectRouter = require("express").Router(),
  Users         = require("../models/user-model"),
  UserRoles     = require("../models/userrole-model"),
  Projects      = require("../models/project-model"),
  ProjectUsers  = require("../models/projectuser-model"),
  Tasks         = require("../models/task-model"),
  TaskUsers     = require("../models/taskuser-model"),
  Comments      = require("../models/comment-model");



// GET

projectRouter.projectAllPage = (req, res) => {
  Projects.findAll( { order: [ [ 'id', 'DESC' ] ]} )
    .then(async projects => {
      // TODO сделать middleware мб
      let prop          = await UserRoles.findOne({where: { id: req.user.role }});

      let userList      = await Users.findAll();
      let projectUsers  = await ProjectUsers.findAll();

      res.render("project/index", {projects, userList, projectUsers, prop})
    })
    .catch(err => {
      console.error(err);
      req.flash("error", err.message);
      res.redirect("back")
    });
};

projectRouter.projectSinglePage = (req, res) => {
  let id_project = Number(req.params.id_project);
  if (id_project && !isNaN(id_project)) {
    Projects.findOne({where: {id: id_project}})
      .then(async project => {
        if (project) {
          // TODO сделать middleware мб
          let prop          = await UserRoles.findOne({where: { id: req.user.role }});

          let userList      = await Users.findAll( {order: [ ["lastname", "ASC"] ]});
          let projectUsers  = await ProjectUsers.findAll();  // TODO WHERE id_project: id_project
          let tasks         = await Tasks.findAll({where: {id_project: id_project}, order: [ ["createdAt", "DESC"] ]});
          let taskUsers     = await TaskUsers.findAll();

          res.render("project/project", {project, userList, projectUsers, tasks, taskUsers, prop})
        } else {
          req.flash("error", "Project with this ID was not found.");
          res.redirect("/project")
        }
      })
      .catch(err => {
        console.error(err);
        req.flash("error", err.message);
        res.redirect("back")
      });

  } else {
    // TODO при нажатии в браузере <-- выполняет эту строчку и флешит ошибку, пока хз как поправить
    req.flash("error", "Invalid query.");
    res.redirect("/project")
  }
};

projectRouter.projectTaskPage = (req, res) => {
  let id_project = Number(req.params.id_project);
  let id_task = Number(req.params.id_task);
  if (id_project && !isNaN(id_project) && id_task && !isNaN(id_task)) {
    Tasks.findOne({where: {id: id_task, id_project: id_project}})
      .then(async task => {
        if (task) {

          // TODO сделать middleware мб
          let prop          = await UserRoles.findOne({where: { id: req.user.role }});

          let project       = await Projects.findOne({where: {id: id_project}});
          let taskAuthor    = await Users.findOne({where: {id: task.author}});
          let userList      = await Users.findAll( {order: [ ["lastname", "ASC"] ]});
          let projectUsers  = await ProjectUsers.findAll({where: {id_project: id_project}});
          let taskUsers     = await TaskUsers.findAll({where: {id_task: id_task}});
          let comments      = await Comments.findAll({where: {id_task: id_task}, order: [ ["createdAt", "DESC"] ]});

          res.render("project/task", {task, project, taskAuthor, userList, projectUsers, taskUsers, comments, prop})
        } else {
          req.flash("error", "Task with this ID was not found.");
          res.redirect("/project")
        }

      })
      .catch(err => {
        console.error(err);
        req.flash("error", err.message);
        res.redirect("back")
      });

  } else {
    req.flash("error", "Invalid query.");
    res.redirect("/project")
  }
};



// POST

projectRouter.createProject = (req, res) => {
  let project = req.body.project;
  Projects.create(project)
    .then(project => {
      req.flash("success", "Project has been created.");
      res.redirect("/project")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("/project")
    });
};

projectRouter.addUserProject = (req, res) => {
  let user = req.body.user;
  ProjectUsers.create(user)
    .then(user => {
      req.flash("info", "User has been added to the project.");
      res.redirect("back")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    });
};

projectRouter.createTask = (req, res) => {
  let task = req.body.task;
  Tasks.create(task)
    .then(task => {
      req.flash("success", "Task has been created.");
      res.redirect("back")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    })
};

projectRouter.addUserTask = (req, res) => {
  let user = req.body.user;
  TaskUsers.create(user)
    .then(user => {
      req.flash("info", "User has been added to the task.");
      res.redirect("back")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    });
};

projectRouter.createComment = (req, res) => {
  let comment = req.body.comment;
  Comments.create(comment)
    .then(com => {
      req.flash("success", "Comment has been created.");
      res.redirect("back")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    });
};


// PUT

projectRouter.changeStatusTask = (req, res) => {
  let newStatus = req.body.status;
  console.log(newStatus);
  Tasks.findOne({where: {id: req.params.id_task} })
    .then(async task => {
      console.log(task);
      await task.update(newStatus);
      req.flash("info", "Status task has been changed.");
      res.redirect("back")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    });
};

projectRouter.editComment = (req, res) => {
  let editComment = req.body.comment;
  Comments.findOne({where: {id: req.params.id_comment}})
    .then(async com => {
      await com.update(editComment);
      req.flash("info", "Comment has been edit.");
      res.redirect("back")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    });
};



// DELETE

projectRouter.deleteComment = (req, res) => {
  Comments.findOne({where: {id: req.params.id_comment} })
    .then(async com => {
      console.log(com);
      await com.destroy();
      req.flash("success", "Comment has been deleted.");
      res.redirect("back")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    })
};


projectRouter.userProp = function(req, res, next) {
  let userRole = req.user.role;
  UserRoles.findOne({where: {id: userRole}})
    .then(prop => {
      console.log(prop);
      if (prop.project_create) {
        res.send(prop)
      } else {
        res.send("NO")
      }
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("/login")
    })
};


module.exports = projectRouter;