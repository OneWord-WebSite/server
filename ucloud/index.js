var HttpRequest = require('./ufile/').HttpRequest;
var AuthClient = require('./ufile/').AuthClient;
var util = require('util');

var bucket = 'oneword';

module.exports = function(imgName, filePath) {
  var req = new HttpRequest('PUT', '/' + imgName, 'oneword', imgName, filePath);
  var client = new AuthClient(req);
  client.SendRequest(() => {});
};