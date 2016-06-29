var Sequelize = require('sequelize');

const DB_USERNAME = require('./config')['DB_USERNAME'];
const DB_PASSWORD = require('./config')['DB_PASSWORD'];
const DB_NAME = 'OneWord';

var sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;