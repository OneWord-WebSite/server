var Word = require('../service/word');
var upload2UpCloud = require('../../ucloud/');
var path = require('path');

exports.add = function*() {
  var fields = this.request.fields;

  var data = {
    userId: this.session.uid,
    role: fields.role,
    cartoon: fields.cartoon,
    word: fields.word,
    pic: this.request.files.image.path.split('/').pop()
  };

  var word = yield Word.create(data);
  this.body = word.get();
}

exports.getDetails = function*() {
  var id = +this.params.id;
  console.log(id)
  var data = yield Word.findOne({
    id,
    verification: true
  });

  var word = data[0][0].get();
  word.praises = data[1].map(p => p.get('userId'));
  word.nextId = data[0][1] ? data[0][1].get('id') : null;

  this.body = word;
};

exports.get = function*() {
  var pageIndex = this.request.query.page;
  var data = yield Word.find({
    verification: true
  }, pageIndex);

  this.body = data.map(d => {
    var r = d.get();
    r.praises = d.Praises.map(item => item.userId);
    delete r.Praises;
    return r;
  });
};

exports.getShareByUserId = function*() {
  var data = yield Word.find({
    verification: true,
    userId: +this.params.id
  }, null);

  this.body = data.map(d => {
    var r = d.get();
    r.praises = d.Praises.map(item => item.userId);
    delete r.Praises;
    return r;
  });
};

exports.getFavourByUserId = function*() {
  var data = yield Word.find({
    verification: true,
    userId: +this.params.id
  }, null);

  this.body = data.filter(v => v.Praises.some(i => i.userId === +this.params.id)).map(d => {
    var r = d.get();
    r.praises = d.Praises.map(item => item.userId);
    delete r.Praises;
    return r;
  });
};

exports.getUnvalidated = function*() {
  var data = yield Word.find({
    verification: false
  });

  this.body = data;
};

exports.valid = function*() {
  // todo
  // upload first
  // delete pic
  var id = +this.params.id;
  var data = yield Word.update(id, {
    verification: true
  });

  upload2UpCloud(data.pic, path.join(__dirname, '../../uploads/' + data.pic));

  this.body = data;
};

exports.unvalid = function*() {
  var id = +this.params.id;
  var data = yield Word.delete(id);

  this.body = data;
};