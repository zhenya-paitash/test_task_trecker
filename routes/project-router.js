let
  projectRouter = require("express").Router(),
  Users         = require("../models").User,
  UserRoles     = require("../models").UserRole,
  Projects      = require("../models").Project,
  ProjectUsers  = require("../models").ProjectUser,
  Tasks         = require("../models").Task,
  TaskUsers     = require("../models").TaskUser,
  Comments      = require("../models").Comment,
  // Users         = require("../old-models/done/user-model"),
  // UserRoles     = require("../old-models/done/userrole-model"),
  // Projects      = require("../old-models/done/project-model"),
  // ProjectUsers  = require("../old-models/done/projectuser-model"),
  // Tasks         = require("../old-models/done/task-model"),
  // TaskUsers     = require("../old-models/done/taskuser-model"),
  // Comments      = require("../old-models/done/comment-model"),
  validator     = require("validator"),
  moment        = require("moment");



// GET
projectRouter.projectAllPage = async (req, res) => {
  let projects     = await Projects.findAll({order: [ [ 'id', 'DESC' ] ]});
  let prop         = await UserRoles.findOne({where: { id: req.user.role }});
  let userList     = await Users.findAll();
  let projectUsers = await ProjectUsers.findAll();
  let dateNow      = await moment().add(1,'days').format("YYYY-MM-DD");

  res.render("project/index", {projects, userList, projectUsers, prop, dateNow, title:`Tasktrecker. Projects`})
};

projectRouter.projectSinglePage = (req, res) => {
  let id_project = Number(req.params.id_project);
  Projects.findOne({where: {id: id_project}})
    .then(async project => {
      if (project) {
        let prop         = await UserRoles.findOne({where: { id: req.user.role }});
        let userList     = await Users.findAll( {order: [ ["lastname", "ASC"] ]});
        let projectUsers = await ProjectUsers.findAll({where: {id_project: id_project}});
        let tasks        = await Tasks.findAll({where: {id_project: id_project}, order: [ ["createdAt", "DESC"] ]});
        let taskUsers    = await TaskUsers.findAll();

        res.render("project/project", {project, userList, projectUsers, tasks, taskUsers, prop,
          title:`Tasktrecker. ${project.name}`})
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
};


projectRouter.projectTaskPage = (req, res) => {
  let
    id_project = Number(req.params.id_project),
    id_task    = Number(req.params.id_task);
  Tasks.findOne({where: {id: id_task, id_project: id_project}})
    .then(async task => {
      if (task) {
        let prop         = await UserRoles.findOne({where: { id: req.user.role }});
        let project      = await Projects.findOne({where: {id: id_project}});
        let taskAuthor   = await Users.findOne({where: {id: task.author}});
        let userList     = await Users.findAll( {order: [ ["lastname", "ASC"] ]});
        let projectUsers = await ProjectUsers.findAll({where: {id_project: id_project}});
        let taskUsers    = await TaskUsers.findAll({where: {id_task: id_task}});
        let comments     = await Comments.findAll({where: {id_task: id_task}, order: [ ["createdAt", "DESC"] ]});

        res.render("project/task", {task, project, taskAuthor, userList, projectUsers,
          taskUsers, comments, prop, title:`Tasktrecker. ${task.name}`})
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
  Tasks.findOne({where: {id: req.params.id_task} })
    .then(async task => {
      if (task.status !== req.body.status.status) {
        await task.update(req.body.status);
        req.flash("success", "Status task has been changed.");
        res.redirect("back")
      } else {
        req.flash("info", "Task already has this status.");
        res.redirect("back")
      }
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    });
};

projectRouter.editComment = (req, res) => {
  Comments.findOne({where: {id: req.params.id_comment}})
    .then(async com => {
      if (Number(req.user.id) === com.author && Number(req.params.id_task) === com.id_task) {
        if (validator.isLength(req.body.comment.text, {min:2, max:undefined})) {
          console.log(req.body.comment.text);
          await com.update(req.body.comment);
          req.flash("info", "Comment has been edit.");
          res.redirect("back")
        } else {
          req.flash("error", "Сomment does not meet the requirements.");
          res.redirect("back")
        }

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
projectRouter.deleteUserProject = (req, res) => {
  ProjectUsers.findOne({where: {id_project: req.params.id_project, id_user: req.body.user.id_user} })
    .then(async developer => {
      await developer.destroy();

      let projectTasks = await Tasks.findAll({where: {id_project: req.params.id_project} });
      projectTasks.forEach(task => {
        TaskUsers.destroy({where: {id_task: task.id, id_user: req.body.user.id_user} });
      });

      req.flash("info", "User has been remove from project.");
      res.redirect("back")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    })
};

projectRouter.deleteUserTask = (req, res) => {
  TaskUsers.findOne({where: {id_task: req.params.id_task, id_user: req.body.user.id_user} })
    .then(async developer => {
      await developer.destroy();
      req.flash("info", "User has been deleted from task.");
      res.redirect("back")
    })
    .catch(err => {
      req.flash("error", err.message);
      res.redirect("back")
    })
};

projectRouter.deleteComment = (req, res) => {
  Comments.findOne({where: {id: req.params.id_comment} })
    .then(async com => {
      if (Number(req.user.id) === com.author && Number(req.params.id_task) === com.id_task) {
        await com.destroy();
        req.flash("info", "Comment has been deleted.");
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