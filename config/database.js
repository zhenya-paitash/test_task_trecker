const Sequelize = require("sequelize");


// Passing parameters separately
const db = new Sequelize('test_trecker_v1', 'postgres', '123321', {
  host: 'localhost',
  dialect: 'postgres',
  define: {

  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


module.exports = db;