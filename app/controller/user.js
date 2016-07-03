var User = require('../service/user');

exports.getUser = function*() {
  var user;
  var id = +this.params.id;

  user = yield User.find(id);
  this.body = user.get();
};

exports.updateBio = function*() {
  var user = yield User.find({
    id: this.session.uid
  });

  user.bio = this.request.fields.bio;
  yield User.save(user);
  this.body = user.get();
};

exports.admin = function*(next) {
  var userType = this.session.userType;
  console.log(userType)
  if (userType === 1) {
    yield next;
  } else {
    this.status = 403;
  }
};

exports.isLogin = function*(next) {
  var uid = this.session.uid;

  if (uid) {
    yield next;
  } else {
    this.status = 403;
  }
}