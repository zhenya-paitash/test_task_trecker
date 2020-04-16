'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRoles', [{
      rolename: "manager",
      user_search:    true,

      project_create: true,
      project_users:  true,

      task_see:       true,
      task_create:    true,
      task_users:     true,
      task_status:    true,

      comment_create: true,
      comment_edit:   true,
      comment_delete: true,

      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      rolename: "developer",
      user_search:    false,

      project_create: false,
      project_users:  false,

      task_see:       true,
      task_create:    true,
      task_users:     false,
      task_status:    true,

      comment_create: true,
      comment_edit:   true,
      comment_delete: true,

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRoles', null, {});
  }
};
