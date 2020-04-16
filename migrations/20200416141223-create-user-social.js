'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserSocials', {
      id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
      // id_user: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},

      id_user:   {type: Sequelize.INTEGER},
      age:       {type: Sequelize.STRING},
      phone:     {type: Sequelize.STRING},
      github:    {type: Sequelize.STRING},
      telegram:  {type: Sequelize.STRING},
      vk:        {type: Sequelize.STRING},
      facebook:  {type: Sequelize.STRING},
      gmail:     {type: Sequelize.STRING},

      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserSocials');
  }
};