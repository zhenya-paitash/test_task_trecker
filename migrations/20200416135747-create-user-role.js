'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserRoles', {
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},

      rolename:       {type: Sequelize.STRING,  allowNull: false},
      user_search:    {type: Sequelize.BOOLEAN, allowNull: false, default: false},
      project_create: {type: Sequelize.BOOLEAN, allowNull: false, default: false},
      project_users:  {type: Sequelize.BOOLEAN, allowNull: false, default: false},
      task_see:       {type: Sequelize.BOOLEAN, allowNull: false, default: false},
      task_create:    {type: Sequelize.BOOLEAN, allowNull: false, default: false},
      task_users:     {type: Sequelize.BOOLEAN, allowNull: false, default: false},
      task_status:    {type: Sequelize.BOOLEAN, allowNull: false, default: false},
      comment_create: {type: Sequelize.BOOLEAN, allowNull: false, default: false},
      comment_edit:   {type: Sequelize.BOOLEAN, allowNull: false, default: false},
      comment_delete: {type: Sequelize.BOOLEAN, allowNull: false, default: false},

      createdAt:      {type: Sequelize.DATE,    allowNull: false},
      updatedAt:      {type: Sequelize.DATE,    allowNull: false}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserRoles');
  }
};