'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},

      author:    {type: Sequelize.INTEGER,  allowNull: false},
      text:      {type: Sequelize.TEXT,     allowNull: false},
      id_task:   {type: Sequelize.INTEGER,  allowNull: false},

      createdAt: {type: Sequelize.DATE,     allowNull: false},
      updatedAt: {type: Sequelize.DATE,     allowNull: false}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};