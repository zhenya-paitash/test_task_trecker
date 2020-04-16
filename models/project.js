'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name:        DataTypes.STRING,
    description: DataTypes.TEXT,
    category:    DataTypes.STRING,
    deadline:    DataTypes.DATE,
    author:      DataTypes.INTEGER,
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};