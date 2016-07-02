var router = require('koa-router')();

var User = require('../app/controller/user');
var Word = require('../app/controller/word');
var Praise = require('../app/controller/praise');
var Oauth = require('../app/controller/oauth');

router.get('/login', Oauth.login);  // done

router.get('/oauth', Oauth.oauth); // done


router.get('/users/:id', User.isLogin, User.getUser); // done

router.put('/users/bio', User.isLogin, User.updateBio); // done

router.get('/weibo/users/:id', User.isLogin, Oauth.getWeiboUserInfo(['screen_name'])); // done

router.get('/users/:id/share', User.isLogin, Word.getShareByUserId); // done

router.get('/users/:id/favour', User.isLogin, Word.getFavourByUserId); // done

router.get('/admin', User.admin); // done

router.get('/admin/words', User.isLogin, Word.getUnvalidated); // node

router.patch('/admin/words/:id', User.isLogin, Word.valid);

router.delete('/admin/words/:id', User.isLogin, Word.unvalid);

router.post('/words', User.isLogin, Word.add);

router.get('/words/:id', User.isLogin, Word.getDetails);

router.get('/words', User.isLogin, Word.get);

router.post('/praise', User.isLogin, Praise.up);

router.delete('/praise', User.isLogin, Praise.down);

module.exports = router;