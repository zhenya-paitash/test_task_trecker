let
  projectRouter = require("express").Router();


projectRouter.projectAllPage = (req, res) => {res.render("project/index")};
projectRouter.projectSinglePage = (req, res) => {res.render("project/project")};
projectRouter.projectTaskPage = (req, res) => {res.render("project/task")};


module.exports = projectRouter;