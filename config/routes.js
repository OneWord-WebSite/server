var router = require('koa-router')();

var User = require('../app/controller/user');
var Word = require('../app/controller/word');
var Praise = require('../app/controller/praise');
var Oauth = require('../app/controller/oauth');

router.get('/login', Oauth.login);  

router.get('/oauth', Oauth.oauth); 

router.get('/users/:id', User.isLogin, User.getUser); 

router.put('/users/bio', User.isLogin, User.updateBio); 

router.get('/weibo/users/:id', User.isLogin, Oauth.getWeiboUserInfo(['screen_name'])); 

router.get('/users/:id/share', User.isLogin, Word.getShareByUserId); 

router.get('/users/:id/favour', User.isLogin, Word.getFavourByUserId); 

router.get('/admin/words', User.isLogin, User.admin, Word.getUnvalidated); 

router.patch('/admin/words/:id', User.isLogin, Word.valid);

router.delete('/admin/words/:id', User.isLogin, Word.unvalid);

router.post('/words', User.isLogin, Word.add);

router.get('/words/:id', User.isLogin, Word.getDetails);

router.get('/words', User.isLogin, Word.get);

router.post('/praise', User.isLogin, Praise.up);

router.delete('/praise', User.isLogin, Praise.down);

module.exports = router;