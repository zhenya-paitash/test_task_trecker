'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name:         DataTypes.STRING,
    description:  DataTypes.TEXT,
    status:       DataTypes.STRING,
    author:       DataTypes.INTEGER,
    // deadline:     DataTypes.DATEONLY,
    id_project:   DataTypes.INTEGER,
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};