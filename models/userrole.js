'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    rolename:       DataTypes.STRING,

    user_search:    DataTypes.BOOLEAN,

    project_create: DataTypes.BOOLEAN,
    project_users:  DataTypes.BOOLEAN,

    task_see:       DataTypes.BOOLEAN,
    task_create:    DataTypes.BOOLEAN,
    task_users:     DataTypes.BOOLEAN,
    task_status:    DataTypes.BOOLEAN,

    comment_create: DataTypes.BOOLEAN,
    comment_edit:   DataTypes.BOOLEAN,
    comment_delete: DataTypes.BOOLEAN,
  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};