let
  projectRouter = require("express").Router(),
  dblocal = require("../local_db");


// GET
projectRouter.projectPage = (req, res) => {
  let projects = dblocal.PROJECT;
  // res.render("project/all", {projects})};
  res.render("project/index")};

// projectRouter.createProjectPage = (req, res) => {
//   res.render("project/create")
// };

// projectRouter.editProjectPage = (req, res) => {
//   // берем проект с данным ID
//   let id_project = req.params.id_project
//   // db.query(`SELECT * FROM public.project WHERE id=${id_project};`)
// };


// // POST
// projectRouter.createProject = (req, res) => {
//   let newProject = req.body.project;
//   Projects.create(newProject);
//   res.redirect("/project")
// };


// // PUT
// projectRouter.editProject = (req, res) => {
//   let newData = req.body.project;
//   // db.query(`INSERT INTO public.project WHERE id=${req.params.id_project} VALUES (${}, ${}, ${})`)
//   res.redirect("/project")
// };


// // DELETE
// projectRouter.deleteProject = (req, res) => {
//   //DELETE FROM public.project WHERE id=${req.params.id_project}
//   res.redirect("/project")
// };


module.exports = projectRouter;