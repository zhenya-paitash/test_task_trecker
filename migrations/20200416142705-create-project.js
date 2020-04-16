'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},

      name:         {type: Sequelize.STRING,  allowNull: false},
      description:  {type: Sequelize.TEXT,    allowNull: false},
      category:     {type: Sequelize.STRING,  allowNull: false},
      deadline:     {type: Sequelize.DATE,    allowNull: false},
      author:       {type: Sequelize.INTEGER, allowNull: false},

      createdAt:    {type: Sequelize.DATE,    allowNull: false},
      updatedAt:    {type: Sequelize.DATE,    allowNull: false}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects');
  }
};