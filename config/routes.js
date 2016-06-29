var router = require('koa-router')();

var User = require('../app/controller/user');
var Word = require('../app/controller/word');
var Praise = require('../app/controller/praise');
var Oauth = require('../app/controller/oauth');

router.get('/login', Oauth.login);  // done

router.get('/oauth', Oauth.oauth); // done

router.get('/users/:id', User.getUser); // done

router.put('/users/bio', User.updateBio); // done

router.get('/weibo/users/:id', Oauth.getWeiboUserInfo(['screen_name'])); // done

router.get('/users/:id/share', Word.getShareByUserId); // done

router.get('/users/:id/favour', Word.getFavourByUserId); // done

router.get('/admin', User.admin); // done

router.get('/admin/words', Word.getUnvalidated); // node

router.patch('/admin/words/:id', Word.valid);

router.delete('/admin/words/:id', Word.unvalid);

router.post('/words', Word.add);

router.get('/words/:id', Word.getDetails);

router.get('/words', Word.get);

router.post('/praise', Praise.up);

router.delete('/praise', Praise.down);

module.exports = router;