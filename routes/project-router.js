let
  projectRouter = require("express").Router(),
  Users         = require("../models/user-model"),
  ProjectUsers  = require("../models/projectuser-model"),
  Projects      = require("../models/project-model");


// GET
projectRouter.projectAllPage = (req, res) => {
  Projects.findAll( { order: [ [ 'id', 'DESC' ] ]} )
    .then(async projects => {

      let userList = await Users.findAll();
      let projectUsers = await ProjectUsers.findAll();

      res.render("project/index", {projects, userList, projectUsers})
    })
    .catch(err => {
      console.error(err);
      req.flash("error", err.message);
      res.redirect("back")
    });

};

projectRouter.projectSinglePage = (req, res) => {
  console.log(req.params.id_project);
  Projects.findOne({where: {id: Number(req.params.id_project)}})
    .then(project => {
      res.render("project/project", {project})
    })
    .catch(err => {
      console.error(err);
      req.flash("error", err.message);
      res.redirect("back")
    });
};

projectRouter.projectTaskPage = (req, res) => {
  res.render("project/task")
};


module.exports = projectRouter;