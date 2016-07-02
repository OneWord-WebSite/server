var sequelize = require('../../config/db');
var Sequelize = require('sequelize');

var User = sequelize.define('User', {
  // id: {
  //   primaryKey: true,
  // },
  id: { type: Sequelize.INTEGER(20).UNSIGNED, primaryKey: true},

  bio: Sequelize.STRING,
  type: Sequelize.INTEGER
});

module.exports = User;