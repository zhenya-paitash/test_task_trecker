const
  Sequelize  = require("sequelize"),
  db        = require("../../config/database");


let ProjectUsers = db.define("project-users", {
  id_project: {type: Sequelize.INTEGER, allowNull: false},
  id_user:    {type: Sequelize.INTEGER, allowNull: false}
}, {
  timestamps: false,
  // createdAt: false,
  // updatedAt: false
});

// ProjectUsers.sync({force: true});


module.exports = ProjectUsers;