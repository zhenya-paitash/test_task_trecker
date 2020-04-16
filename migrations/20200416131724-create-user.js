'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},

      firstname:  {type: Sequelize.STRING,  allowNull: false},
      lastname:   {type: Sequelize.STRING,  allowNull: false},
      email:      {type: Sequelize.STRING,  allowNull: false, unique: true},
      password:   {type: Sequelize.STRING,  allowNull: false},
      role:       {type: Sequelize.INTEGER, allowNull: false},
      rft:        {type: Sequelize.TEXT},

      createdAt:  {type: Sequelize.DATE,    allowNull: false},
      updatedAt:  {type: Sequelize.DATE,    allowNull: false}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};