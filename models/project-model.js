const
  Sequelize   = require("sequelize"),
  db          = require("../config/database");


let Projects = db.define("projects", {
  name: {type: Sequelize.STRING, allowNull: false},
  description: {type: Sequelize.TEXT, allowNull: false},
  image: {type: Sequelize.TEXT},
  deadline: {type: Sequelize.DATE}
});

// Projects.sync({force: true});


module.exports = Projects;