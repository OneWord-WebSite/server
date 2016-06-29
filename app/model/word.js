var sequelize = require('../../config/db');
var Sequelize = require('sequelize');

var Word = sequelize.define('Word', {
  role: Sequelize.STRING,
  cartoon: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  pic: Sequelize.STRING,
  word: Sequelize.STRING,
  verification: {type: Sequelize.BOOLEAN, defaultValue: false}
});

module.exports = Word;
