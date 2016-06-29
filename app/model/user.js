var sequelize = require('../../config/db');
var Sequelize = require('sequelize');

var User = sequelize.define('User', {
  bio: Sequelize.STRING,
  type: Sequelize.INTEGER
});

module.exports = User;