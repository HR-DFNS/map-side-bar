var mongoDB = require('../models/mongo/restaurant.js');

var searchMongo = (id) => {
  return mongoDB.find({ 'result.place_id': id })
    .then((result) => {
      return result[0];
    });
};

module.exports.searchMongo = searchMongo;