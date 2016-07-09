var Word = require('../model/word');
var Praise = require('../model/praise');

exports.create = function(data) {
  return cb => {
    Word
      .create(data)
      .then(word => {
        cb(null, word);
      });
  };
};

exports.findOne = function(conditions) {
  return cb => {
    var querys = [
      Word.findAll({
        where: {
          id: {
            $gte: conditions.id
          },
          verification: conditions.verification,
        },
        limit: 2
      }),
      Praise.findAll({
        where: {
          wordId: conditions.id
        }
      })
    ];

    Promise.all(querys).then(data => {
      cb(null, data);
    });
  };
};

exports.find = function(wordConditions, praiseConditons, pageIndex) {
  Praise.belongsTo(Word);
  Word.hasMany(Praise);

  return cb => {
    Word
      .findAll({
        include: [{
          model: Praise,
          where: praiseConditons
        }],
        where: wordConditions,
        offset: pageIndex ? pageIndex * 5 : null,
        limit: pageIndex ? 5 : null,
        order: 'id DESC'
      })
      .then(words => {
        cb(null, words);
      });
  };
};

exports.update = function(id, props) {
  return cb => {
    Word
      .findById(id)
      .then(word => {
        for (let i in props) {
          word[i] = props[i];
        }
        return word.save();
      })
      .then(word => {
        cb(null, word);
      });
  };
};

exports.delete = function(id) {
  return cb => {
    Word
      .findById(id)
      .then(word => word.destroy())
      .then(word => {
        cb(null, word);
      });
  };
};