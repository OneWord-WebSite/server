var Praise = require('../service/praise');
var Word = require('../service/word');

exports.up = function*() {
  var praise = yield Praise.create(this.request.fields);
  this.body = praise;
};

exports.down = function*() {
  var praise = (yield Praise.delete(this.request.fields)).get();
  delete praise.id;
  this.body = praise;
};