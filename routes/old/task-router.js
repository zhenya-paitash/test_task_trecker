let
  taskRouter = require("express").Router();


// // GET
// taskRouter.createTaskPage = (req,res)=>{
//   res.render("task/create")
// };

// taskRouter.editTaskPage = (req, res) => {
//   let task = // db.query(`SELECT * FROM public.tusk WHERE id=${req.params.id_task};`)
//   res.render("task/edit", {task})
// };


// // POST
// taskRouter.createTask = (req, res)=>{
//   Task.create(req.body.task);
//   res.redirect(`/project/${req.params.id_project}`)
// };



// PUT



module.exports = taskRouter;