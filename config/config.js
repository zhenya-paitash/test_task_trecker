const fs = require('fs');
require("dotenv").config();


module.exports = {

  dev: {
    username: process.env.PGUSER,
    password: process.env.PGPASS,
    database: process.env.PGDATABASE,
    host:     process.env.PGHOST,
    port:     process.env.PGPORT,
    dialect: 'postgres',
    define:   {},
    dialectOptions: {
      bigNumberStrings: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },

  // production: {
  //   username: process.env.PROD_DB_USERNAME,
  //   password: process.env.PROD_DB_PASSWORD,
  //   database: process.env.PROD_DB_NAME,
  //   host: process.env.PROD_DB_HOSTNAME,
  //   port: process.env.PROD_DB_PORT,
  //   dialect: 'mysql',
  //   dialectOptions: {
  //     bigNumberStrings: true,
  //     // ssl: {
  //     //   ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
  //     // }
  //   }
  // }

};