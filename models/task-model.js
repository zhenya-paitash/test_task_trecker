const
  Sequelize   = require("sequelize"),
  db          = require("../config/database");


let Tasks = db.define("tasks", {
  name: {type: Sequelize.STRING, allowNull: false},
  description: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.STRING, allowNull: false},
  author: {type: Sequelize.INTEGER, allowNull: false},
  // deadline: {type: Sequelize.DATEONLY},
  id_project: {type: Sequelize.INTEGER, allowNull: false}
});

// Tasks.sync({force: true});


module.exports = Tasks;