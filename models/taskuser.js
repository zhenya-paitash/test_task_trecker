'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskUser = sequelize.define('TaskUser', {
    id_task: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
  }, {
    timestamps: false
  });
  TaskUser.associate = function(models) {
    // associations can be defined here
  };
  return TaskUser;
};