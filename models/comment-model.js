const
  Sequelize   = require("sequelize"),
  db          = require("../config/database");


let Comments = db.define("comments", {
  author:   {type: Sequelize.INTEGER, allowNull: false},
  text:     {type: Sequelize.TEXT,    allowNull: false},
  id_task:  {type: Sequelize.INTEGER, allowNull: false}
});

// Comments.sync({force: true});


module.exports = Comments;