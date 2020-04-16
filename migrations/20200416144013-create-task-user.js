'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TaskUsers', {
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},

      id_task: {type: Sequelize.INTEGER, allowNull: false},
      id_user: {type: Sequelize.INTEGER, allowNull: false}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TaskUsers');
  }
};