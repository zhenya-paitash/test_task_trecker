const
  Sequelize   = require("sequelize"),
  db          = require("../config/database");


let NewUsers = db.define("new-users", {
  jwt: {type: Sequelize.TEXT, allowNull: false},
},{
  updatedAt: false
});

// NewUsers.sync({force: true});


module.exports = NewUsers;