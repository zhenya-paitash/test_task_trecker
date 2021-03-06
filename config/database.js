const Sequelize = require("sequelize");


// Passing parameters separately
const db = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASS, {
  host: process.env.PGHOST,
  dialect: 'postgres',
  define: {},
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


module.exports = db;