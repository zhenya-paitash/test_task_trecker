'use strict';
module.exports = (sequelize, DataTypes) => {
  const NewUser = sequelize.define('NewUser', {
    jwt: DataTypes.TEXT
  }, {
    updatedAt: false
  });
  NewUser.associate = function(models) {
    // associations can be defined here
  };
  return NewUser;
};