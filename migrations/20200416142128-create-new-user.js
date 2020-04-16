'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NewUsers', {
      id:  {type: Sequelize.INTEGER,  allowNull: false, autoIncrement: true, primaryKey: true},
      jwt: {type: Sequelize.TEXT,     allowNull: false},

      createdAt:  {type: Sequelize.DATE, allowNull: false},
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NewUsers');
  }
};