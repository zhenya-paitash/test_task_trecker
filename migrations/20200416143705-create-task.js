'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},

      name:        {type: Sequelize.STRING,  allowNull: false},
      description: {type: Sequelize.TEXT,    allowNull: false},
      status:      {type: Sequelize.STRING,  allowNull: false},
      author:      {type: Sequelize.INTEGER, allowNull: false},
      // deadline:    {type: Sequelize.DATEONLY},
      id_project:  {type: Sequelize.INTEGER, allowNull: false},

      createdAt:   {type: Sequelize.DATE,    allowNull: false},
      updatedAt:   {type: Sequelize.DATE,    allowNull: false}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};