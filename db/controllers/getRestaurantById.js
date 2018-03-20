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
    var output = data[0][0];
    var periods = [];
    var weekday_text = ["Monday: ","Tuesday: ","Wednesday: ","Thursday: ","Friday: ","Saturday: ","Sunday: "];

    for (var i = 0; i < 7; i++) {
      var day = 'day' + i;
      var close = output[day].split('/')[1];
      var open = output[day].split('/')[0];
      periods.push({close: {day: i, time: close}, open: {day: i, time: open}})

      var opentime = (+open/100) + ':00 AM';
      var closetime = (close - 1200)/100 + ':00 PM';
      weekday_text[i] = weekday_text[i].concat(opentime + ' - ' + closetime);
    }

    var dataToSend = {
      result: {
        opening_hours: {
          periods: periods,
          weekday_text: weekday_text
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