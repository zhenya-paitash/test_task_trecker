'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSocial = sequelize.define('UserSocial', {
    id_user:  DataTypes.INTEGER,
    age:      DataTypes.STRING,
    phone:    DataTypes.STRING,
    github:   DataTypes.STRING,
    telegram: DataTypes.STRING,
    vk:       DataTypes.STRING,
    facebook: DataTypes.STRING,
    gmail:    DataTypes.STRING
  }, {});
  UserSocial.associate = function(models) {
    // associations can be defined here
  };
  return UserSocial;
};