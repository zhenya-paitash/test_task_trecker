const
  Sequelize   = require("sequelize"),
  db          = require("../../config/database");


let TaskUsers = db.define("task-users", {
  id_task: {type: Sequelize.INTEGER, allowNull: false},
  id_user: {type: Sequelize.INTEGER, allowNull: false}
}, {
  timestamps: false
  // createdAt: false,
  // updatedAt: false
});

// TaskUsers.sync({force: true});


module.exports = TaskUsers;