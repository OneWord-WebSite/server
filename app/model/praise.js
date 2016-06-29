var sequelize = require('../../config/db');
var Sequelize = require('sequelize');

var Praise = sequelize.define('Praise', {
  wordId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
});

module.exports = Praise;