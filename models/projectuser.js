'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define('ProjectUser', {
    id_project: DataTypes.INTEGER,
    id_user:    DataTypes.INTEGER
  }, {
    timestamps: false
  });
  ProjectUser.associate = function(models) {
    // associations can be defined here
  };
  return ProjectUser;
};