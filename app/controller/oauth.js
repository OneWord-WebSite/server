var Oauth = require('../service/oauth');
var User = require('../service/user');

exports.login = function*() {
  yield this.render('login');
};

exports.oauth = function*() {
  var code = this.query.code;
  var atData = yield Oauth.getAccessToken(code);
  var user;

  this.session.access_token = atData.accessToken;
  this.session.uid = atData.uid;

  var infoData = yield Oauth.getUserInfo(atData.accessToken, atData.uid);

  this.session.nickname = infoData.screen_name;

  user = yield User.find({id: this.session.uid});

  this.session.userType = user.type;

  this.cookies.set('nickname', encodeURI(this.session.nickname), {
    httpOnly: false
  });
  this.cookies.set('uid', this.session.uid, {
    httpOnly: false
  });
  this.redirect('/');
};

exports.getWeiboUserInfo = function(fields) {
  return function*() {
    this.set('Cache-Control', 'max-age=10000');
    if (this.fresh) {
      this.status = 304;
      return;
    }

    var id = +this.params.id;
    this.response.set('ETag', `nickname/${id}`);

    var infoData = yield Oauth.getUserInfo(this.session.access_token, id);
    this.body = {}

    var res = fields.forEach(value => {
      this.body[value] = infoData[value]
    })
  };
};