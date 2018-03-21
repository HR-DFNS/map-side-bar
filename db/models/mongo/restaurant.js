var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
databaseHost = process.env.DATABASE_HOST || 'localhost';
var db = mongoose.connect('mongodb://13.58.241.146/wegot-sidebar', {
  useMongoClient: true
});

var restaurantSchema = mongoose.Schema({
  _id: Number,
  place_id: String,
  address: String,
  phone: String,
  website: String,
  url: String,
  lat: Number,
  lng: Number,
  day0: String,
  day1: String,
  day2: String,
  day3: String,
  day4: String,
  day5: String,
  day6: String,
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);


var find = (queryObj) => {
  return Restaurant.find(queryObj);
};

var insert = (documents) => {
  return Restaurant.insertMany(documents);
};

var remove = (queryObj) => {
  return Restaurant.remove(queryObj);
};

var count = (queryObj) => {
  return Restaurant.count(queryObj);
};

//database functions
exports.find = find;
exports.insert = insert;
exports.remove = remove;
exports.count = count;

//misc objects for testing and database seeding
exports.Restaurant = Restaurant;
exports.mongoose = mongoose;
