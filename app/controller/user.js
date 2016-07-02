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

exports.admin = function*() {
  var userType = this.session.userType;

  if (userType === 1) {
    this.redirect('/admin.html');
  } else {
    yield this.render('login');
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