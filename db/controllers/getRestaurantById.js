var mongoDB = require('../models/mongo/restaurant.js');
var Sequelize = require('sequelize');

const sequelize = new Sequelize('wegot_sidebar', 'root', '', {
  dialect: 'mysql'
});

var searchMongo = (id) => {
  return mongoDB.find({ 'result.place_id': id })
    .then((result) => {
      return result[0];
    });
};

var searchMySQL = (id) => {
  return sequelize.query(`SELECT * FROM restaurants WHERE place_id = ${id}`).then(data => {
    var output = data[0][0]
    var dataToSend = {
      result: {
        opening_hours: {
          periods: JSON.parse(output.periods),
          open_now: output.open_now,
          weekday_text: output.weekday_text.split(',')
        },
        geometry: {
          location: {
            lat: output.lat,
            lng: output.lng
          }
        },
        formatted_address: output.address,
        international_phone_number: output.phone,
        name: output.name,
        place_id: output.place_id,
        url: output.url,
        website: output.website
      }
    }
    return dataToSend;
  })
}

module.exports.searchMongo = searchMongo;
module.exports.searchMySQL = searchMySQL;