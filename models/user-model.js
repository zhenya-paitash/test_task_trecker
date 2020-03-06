const
  Sequelize   = require("sequelize"),
  db          = require("../config/database");


let Users = db.define("users", {
  firstname: {type: Sequelize.STRING, allowNull: false},
  lastname: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false, unique: true},
  age: {type: Sequelize.INTEGER},
  phone: {type: Sequelize.STRING},
  password: {type: Sequelize.STRING, allowNull: false},
  role: {type: Sequelize.INTEGER, allowNull: false}
});

// Users.sync({force: true});


module.exports = Users;