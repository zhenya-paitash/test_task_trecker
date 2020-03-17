let
  V         = {},
  validator = require("validator");


// ------------------------------------------- INDEX -------------------------------------------
V.sgnup = (req, res, next) => {
  let
    errors      = [],
    email       = req.body.email,
    firstname   = req.body.firstname,
    lastname    = req.body.lastname,
    password    = req.body.password,
    role        = req.body.role,
    emlpattern  = /[a-z0-9]+([-+._][a-z0-9]+){0,2}@.*?(\.(a(?:[cdefgilmnoqrstuwxz]|ero|(?:rp|si)a)|b(?:[abdefghijmnorstvwyz]iz)|c(?:[acdfghiklmnoruvxyz]|at|o(?:m|op))|d[ejkmoz]|e(?:[ceghrstu]|du)|f[ijkmor]|g(?:[abdefghilmnpqrstuwy]|ov)|h[kmnrtu]|i(?:[delmnoqrst]|n(?:fo|t))|j(?:[emop]|obs)|k[eghimnprwyz]|l[abcikrstuvy]|m(?:[acdeghklmnopqrstuvwxyz]|il|obi|useum)|n(?:[acefgilopruz]|ame|et)|o(?:m|rg)|p(?:[aefghklmnrstwy]|ro)|qa|r[eosuw]|s[abcdeghijklmnortuvyz]|t(?:[cdfghjklmnoprtvwz]|(?:rav)?el)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\b){1,2}/,
    paspattern  = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/;

  if (!validator.isLength(firstname, {min:3, max: 200})) {errors.push("Invalid field firstname")}
  if (!validator.isLength(lastname, {min:3, max: 200})) {errors.push("Invalid field lastname")}
  if (!validator.matches(email, emlpattern)) {errors.push("Invalid field email")}
  if (!validator.matches(password, paspattern)) {errors.push("Invalid field password")}
  if (!validator.isInt(role, {min:1, max:2})) {errors.push("Invalid field role")}

  return checkErrors(req, res, next, errors);
};


V.usrch = (req, res, next) => {
  let id_user = Number(req.params.id_user);
  if (id_user && !isNaN(id_user)) {
    return next()
  }

  req.flash("error", "Check ID field");
  res.redirect('/user')
};


V.usupd = (req, res, next) => {
  let
    errors = [],
    user   = req.body.user,
    social = req.body.social;

  if (!validator.isLength(user.firstname, {min:3, max: 200})) {errors.push("Invalid field firstname")}
  if (!validator.isLength(user.lastname, {min:3, max: 200})) {errors.push("Invalid field lastname")}

  // if (!validator.isInt(social.age, {min: 18, max:99})) {errors.push("Invalid field age")}
  // if (!social.phone !== '' || !validator.isMobilePhone(social.phone, {strictMode: true})) {errors.push("Invalid field phone")}
  // if (!validator.isURL(social.github)) {errors.push("Invalid field github")}

  return checkErrors(req, res, next, errors);
};


// ------------------------------------------- PROJECT -------------------------------------------
V.pjspg = (req, res, next) => {
  let id_project = Number(req.params.id_project);

  if (id_project && !isNaN(id_project)) {
    return next()
  }

  req.flash("error", "Invalid query.");
  res.redirect("/project")
};


V.pjcrt = (req, res, next) => {
  let
    errors  = [],
    project = req.body.project;

  if (Number(req.user.id) !== Number(project.author)) {errors.push("Invalid field author")}
  if (!validator.isLength(project.name, {min:3, max: 200})) {errors.push("Invalid field name")}
  if (!validator.isLength(project.description, {min:3, max: undefined})) {errors.push("Invalid field description")}
  if (!validator.isAfter(project.deadline)) {errors.push("Invalid field deadline")}

  return checkErrors(req, res, next, errors);
};


// ------------------------------------------- TASK -------------------------------------------
V.tkspg = (req, res, next) => {
  let
    id_project = Number(req.params.id_project),
    id_task    = Number(req.params.id_task);

  if (id_project && !isNaN(id_project) && id_task && !isNaN(id_task)) {
    return next()
  }

  req.flash("error", "Invalid query.");
  res.redirect("/project")
};


V.tkcrt = (req, res, next) => {
  let
    errors  = [],
    task = req.body.task;

  if (Number(req.user.id) !== Number(task.author)) {errors.push("Invalid field author")}
  if (Number(req.params.id_project) !== Number(task.id_project)) {errors.push("Invalid field id_project")}
  if (!validator.isLength(task.name, {min:3, max: 200})) {errors.push("Invalid field name")}
  if (!validator.isLength(task.description, {min:3, max: undefined})) {errors.push("Invalid field description")}

  return checkErrors(req, res, next, errors);
};


V.tksts = (req, res, next) => {
  let status = req.body.status.status;
  if (["waiting", "implementation", "verifyng", "releasing"].indexOf(status) !== -1) {
    return next()
  }

  req.flash("error", "This status does not exist");
  res.redirect("back")
};


// ------------------------------------------- COMMENT -------------------------------------------
V.cmcrt = (req, res, next) => {
  let
    errors  = [],
    comment = req.body.comment;

  if (Number(req.user.id) !== Number(comment.author)) {errors.push("Invalid field author")}
  if (Number(req.params.id_task) !== Number(comment.id_task)) {errors.push("Invalid field id_task")}
  if (!validator.isLength(comment.text, {min:2, max: undefined})) {errors.push("Invalid field text")}

  return checkErrors(req, res, next, errors);
};


function checkErrors(req, res, next, errors) {
  if (errors.length > 0) {
    req.flash("error", errors);
    return res.redirect("back")
  }

  next()
}


module.exports = V;