const
  Sequelize   = require("sequelize"),
  db          = require("../config/database");


let Projects = db.define("projects", {
  name: {type: Sequelize.STRING, allowNull: false},
  description: {type: Sequelize.TEXT, allowNull: false},
  // image: {type: Sequelize.TEXT},
  category: {type: Sequelize.STRING, allowNull: false},
  deadline: {type: Sequelize.DATE},
  author: {type: Sequelize.INTEGER, allowNull: false}
});

// Projects.sync({force: true});


module.exports = Projects;