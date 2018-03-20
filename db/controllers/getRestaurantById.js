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

var periods = [
  {close: {day: 0, time: ''}, open: {day: 0, time: ''}},
  {close: {day: 1, time: ''}, open: {day: 1, time: ''}},
  {close: {day: 2, time: ''}, open: {day: 2, time: ''}},
  {close: {day: 3, time: ''}, open: {day: 3, time: ''}},
  {close: {day: 4, time: ''}, open: {day: 4, time: ''}},
  {close: {day: 5, time: ''}, open: {day: 5, time: ''}},
  {close: {day: 6, time: ''}, open: {day: 6, time: ''}},
]

var weekday_text = [
  "Monday: 8:00 AM – 6:00 PM",
  "Tuesday: 8:00 AM – 6:00 PM",
  "Wednesday: 8:00 AM – 6:00 PM",
  "Thursday: 8:00 AM – 6:00 PM",
  "Friday: 8:00 AM – 6:00 PM",
  "Saturday: 8:00 AM – 6:00 PM",
  "Sunday: 8:00 AM – 6:00 PM"
]

var searchMySQL = (id) => {
  return sequelize.query(`SELECT * FROM restaurants WHERE place_id = ${id}`).then(data => {
    console.log(data[0][0]);
    var output = data[0][0];

    periods[0].close.time = output.day0.split('/')[1];
    periods[0].open.time = output.day0.split('/')[0];
    periods[1].close.time = output.day1.split('/')[1];
    periods[1].open.time = output.day1.split('/')[0]
    periods[2].close.time = output.day2.split('/')[1];
    periods[2].open.time = output.day2.split('/')[0]
    periods[3].close.time = output.day3.split('/')[1];
    periods[3].open.time = output.day3.split('/')[0]
    periods[4].close.time = output.day4.split('/')[1];
    periods[4].open.time = output.day4.split('/')[0]
    periods[5].close.time = output.day5.split('/')[1];
    periods[5].open.time = output.day5.split('/')[0]
    periods[6].close.time = output.day6.split('/')[1];
    periods[6].open.time = output.day6.split('/')[0]

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