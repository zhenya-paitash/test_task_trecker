// npm install @hapi/joi

// VALIDATION
const
  V   = {},
  Joi = require("@hapi/joi");


// VALIDATION SCHEMA
const joiSchema = Joi.object({
  // USER
  firstname: Joi
    .string()
    .alphanum()
    .min(3)
    .max(200)
    // .required()
  ,

  lastname: Joi
    .string()
    .alphanum()
    .min(3)
    .max(200)
    // .required()
  ,

  email: Joi
    .string()
    // .pattern(new RegExp('^[a-z0-9]+([-+._][a-z0-9]+){0,2}@.*?(\\.(a(?:[cdefgilmnoqrstuwxz]|ero|(?:rp|si)a)|b(?:[abdefghijmnorstvwyz]iz)|c(?:[acdfghiklmnoruvxyz]|at|o(?:m|op))|d[ejkmoz]|e(?:[ceghrstu]|du)|f[ijkmor]|g(?:[abdefghilmnpqrstuwy]|ov)|h[kmnrtu]|i(?:[delmnoqrst]|n(?:fo|t))|j(?:[emop]|obs)|k[eghimnprwyz]|l[abcikrstuvy]|m(?:[acdeghklmnopqrstuvwxyz]|il|obi|useum)|n(?:[acefgilopruz]|ame|et)|o(?:m|rg)|p(?:[aefghklmnrstwy]|ro)|qa|r[eosuw]|s[abcdeghijklmnortuvyz]|t(?:[cdfghjklmnoprtvwz]|(?:rav)?el)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\\b){1,2}$'))
    .regex(/[a-z0-9]+([-+._][a-z0-9]+){0,2}@.*?(\\.(a(?:[cdefgilmnoqrstuwxz]|ero|(?:rp|si)a)|b(?:[abdefghijmnorstvwyz]iz)|c(?:[acdfghiklmnoruvxyz]|at|o(?:m|op))|d[ejkmoz]|e(?:[ceghrstu]|du)|f[ijkmor]|g(?:[abdefghilmnpqrstuwy]|ov)|h[kmnrtu]|i(?:[delmnoqrst]|n(?:fo|t))|j(?:[emop]|obs)|k[eghimnprwyz]|l[abcikrstuvy]|m(?:[acdeghklmnopqrstuvwxyz]|il|obi|useum)|n(?:[acefgilopruz]|ame|et)|o(?:m|rg)|p(?:[aefghklmnrstwy]|ro)|qa|r[eosuw]|s[abcdeghijklmnortuvyz]|t(?:[cdfghjklmnoprtvwz]|(?:rav)?el)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\\b){1,2}/)
    // .required()
  ,

  password: Joi
    .string()
    // .pattern(new RegExp('^(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
    .regex(/(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*/)
    // .required()
  ,

  role: Joi
    .number()
    .integer()
    .min(1)
    .max(2)
    // .required()
  ,

  id_user: Joi
    .number()
    .integer()
    .min(1)
    // .required()
  ,

  // PROJECT
  id_project: Joi
    .number()
    .integer()
    .min(1)
    // .required()
  ,

  author: Joi
    .number()
    .integer()
    .min(1)
    // .required()
  ,

  name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(200)
    // .required()
  ,

  description: Joi
    .string()
    .alphanum()
    .min(3)
    // .required()
  ,

  category: Joi
    .string()
    .alphanum()
    // .required()
  ,

  deadline: Joi
    .date()
    // .required()
  ,

  // TASK
  id_task: Joi
    .number()
    .integer()
    .min(1)
    // .required()
  ,

  status: Joi
    .string()
    .alphanum()
    // .required()
  ,

  // COMMENT
  text: Joi
    .string()
    .alphanum()
    .min(2)
    // .required()
});


// REGISTER VALIDATION
V.sgnup = (req, res, next) => {
  const { error } = joiSchema.validate(req.body);
  return checkErrors(req, res, next, error);
};


V.usrch = (req, res, next) => {
  const { error } = joiSchema.validate(req.params);
  return checkErrors(req, res, next, error);
};


V.usupd = (req, res, next) => {
  const { error } = joiSchema.validate(req.body);
  return checkErrors(req, res, next, error);
};


// ------------------------------------------- PROJECT -------------------------------------------
V.pjspg = (req, res, next) => {
  const { error } = joiSchema.validate(req.params);
  return checkErrors(req, res, next, error);
};


V.pjcrt = (req, res, next) => {
  if (Number(req.user.id) !== Number(req.body.project.author)) return res.status(400).redirect("back");
  const { error } = joiSchema.validate(req.body);
  return checkErrors(req, res, next, error);
};


// ------------------------------------------- TASK -------------------------------------------
V.tkspg = (req, res, next) => {
  const { error } = joiSchema.validate(req.params);
  return checkErrors(req, res, next, error);
};


V.tkcrt = (req, res, next) => {
  if (Number(req.user.id) !== Number(req.body.task.author)) return res.status(400).redirect("back");
  if (Number(req.params.id_project) !== Number(req.body.task.id_project)) return res.status(400).redirect("back");
  const { error } = joiSchema.validate(req.body);
  return checkErrors(req, res, next, error);
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
  const { error } = joiSchema.validate(req.body);
  return checkErrors(req, res, next, error);
};


function checkErrors(req, res, next, error) {
  if (error) {
    req.flash("error", error.details[0].message);
    return res.status(400).redirect("back")
  }

  next()
}


module.exports = V;