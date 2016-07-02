var Koa = require('koa');
var session = require('koa-session');
var body = require('koa-better-body');
var views = require('koa-views');
var serve = require('koa-static');

var app = Koa();
var path = require('path')

var router = require('./config/routes');
var sequelize = require('./config/db');

app.keys = ['some secret hurr'];

app.use(views(__dirname + '/views'));
app.use(serve('./uploads/'));
app.use(session(app));
app.use(body({
  uploadDir: path.join(__dirname, 'uploads'),
  keepExtensions: true
}));

app.use(router.routes());


sequelize.sync();

app.listen(3000);