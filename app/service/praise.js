var Word = require('../model/word');
var Praise = require('../model/praise');

exports.create = function(props) {
  return cb => {
    Praise
      .create(props)
      .then(praise => {
        cb(null, praise);
      });
  };
};

exports.delete = function(conditions) {
  return cb => {
    Praise
      .findOne({where: conditions})
      .then(praise => praise.destroy())
      .then(praise => {
        cb(null, praise);
      });
  };
};

exports.find = function(conditions) {
  return cb => {
    Praise
      .findAll({where: conditions})
      .then(praises => {
        cb(null, praises);
      });
  };
};