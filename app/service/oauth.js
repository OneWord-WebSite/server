var thunkify = require('thunkify');
var request = require('request');

var post = thunkify(request.post);
var get = thunkify(request.get);

const WB_CLIENT_ID = require('../../config/config')['WB_CLIENT_ID'];
const WB_CLIENT_SECRET = require('../../config/config')['WB_CLIENT_SECRET'];

exports.getAccessToken = function*(code) {
  var data = yield post({
    uri: 'https://api.weibo.com/oauth2/access_token',
    qs: {
      client_id: WB_CLIENT_ID,
      client_secret: WB_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://oneword.cc/oauth'
    },
    json: true
  });

  return {
    accessToken: data[0].body.access_token,
    uid: data[0].body.uid
  };
};

exports.getUserInfo = function*(accessToken, uid) {
  var data = yield get({
    uri: 'https://api.weibo.com/2/users/show.json',
    qs: {
      access_token: accessToken,
      uid: uid
    },
    json: true
  });

  return data[0].body;
};