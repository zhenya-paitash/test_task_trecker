const
  Sequelize   = require("sequelize"),
  db          = require("../../config/database");


let UserSocials = db.define("user-socials", {
  id_user:  {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
  age:      {type: Sequelize.STRING},
  phone:    {type: Sequelize.STRING},
  github:   {type: Sequelize.STRING},
  telegram: {type: Sequelize.STRING},
  vk:       {type: Sequelize.STRING},
  facebook: {type: Sequelize.STRING},
  gmail:    {type: Sequelize.STRING},
});

// UserSocials.sync({force: true});


module.exports = UserSocials;