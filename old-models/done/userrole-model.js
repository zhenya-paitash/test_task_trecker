const
  Sequelize   = require("sequelize"),
  db          = require("../../config/database");


let UserRoles = db.define("user-roles", {
  rolename:       {type: Sequelize.STRING,  allowNull: false},
  user_search:    {type: Sequelize.BOOLEAN, allowNull: false, default: false},

  project_create: {type: Sequelize.BOOLEAN, allowNull: false, default: false},
  project_users:  {type: Sequelize.BOOLEAN, allowNull: false, default: false},

  task_see:       {type: Sequelize.BOOLEAN, allowNull: false, default: false},
  task_create:    {type: Sequelize.BOOLEAN, allowNull: false, default: false},
  task_users:     {type: Sequelize.BOOLEAN, allowNull: false, default: false},
  task_status:    {type: Sequelize.BOOLEAN, allowNull: false, default: false},

  comment_create: {type: Sequelize.BOOLEAN, allowNull: false, default: false},
  comment_edit:   {type: Sequelize.BOOLEAN, allowNull: false, default: false},
  comment_delete: {type: Sequelize.BOOLEAN, allowNull: false, default: false}
});

// UserRoles.sync({force: true});


module.exports = UserRoles;