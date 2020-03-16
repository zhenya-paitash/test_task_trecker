let
  projectRouter = require("express").Router(),
  Users         = require("../models/user-model"),
  UserRoles     = require("../models/userrole-model"),
  Projects      = require("../models/project-model"),
  ProjectUsers  = require("../models/projectuser-model"),
  Tasks         = require("../models/task-model"),
  TaskUsers     = require("../models/taskuser-model"),
  Comments      = require("../models/comment-model"),
  validator     = require("validator");



// GET
projectRouter.projectAllPage = (req, res) => {
  Projects.findAll( { order: [ [ 'id', 'DESC' ] ]} )
    .then(async projects => {
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
    // TODO ошибка при возврате назад
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
  Projects.create(req.body.project)
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
  ProjectUsers.create(req.body.user)
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
  Tasks.create(req.body.task)
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
  TaskUsers.create(req.body.user)
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
  Comments.create(req.body.comment)
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
  if (["waiting", "implementation", "verifyng", "releasing"].indexOf(req.body.status.status) !== -1) {

    Tasks.findOne({where: {id: req.params.id_task} })
      .then(async task => {
        await task.update(req.body.status);
        req.flash("info", "Status task has been changed.");
        res.redirect("back")
      })
      .catch(err => {
        req.flash("error", err.message);
        res.redirect("back")
      });

  } else {
    req.flash("error", "Invalid form");
    res.redirect("back")
  }

};

projectRouter.editComment = (req, res) => {
  Comments.findOne({where: {id: req.params.id_comment}})
    .then(async com => {
      if (Number(req.user.id) === com.author && Number(req.params.id_task) === com.id_task) {
        await com.update(req.body.comment);
        req.flash("info", "Comment has been edit.");
        res.redirect("back")

      } else {
        req.flash("error", "You do not have access to this action!");
        res.redirect("back")
      }
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
      if (Number(req.user.id) === com.author && Number(req.params.id_task) === com.id_task) {
        await com.destroy();
        req.flash("success", "Comment has been deleted.");
        res.redirect("back")
      } else {
        req.flash("error", "You do not have access to this action!");
        res.redirect("back")
      }
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    })
};


module.exports = projectRouter;