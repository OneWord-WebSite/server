var User = require('../model/user');

exports.find = function(conditions) {
  return cb => {
    User
      .findOrCreate({where: conditions})
      .spread((user, created) => {
        cb(null, user);
      });
    };
};

exports.save = function(user) {
  return cb => {
    user
      .save()
      .then(user => {
        cb(null, user);
      });
    };
};