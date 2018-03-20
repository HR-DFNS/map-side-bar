const faker = require('faker');
const fs = require('fs');

var counter = 1;

var numPerFile = 1000;
var numOfFiles = 10;

var filename = './data/data-part-'+ counter +'.csv';

var writeFiles = function(num) {
  let file = fs.createWriteStream(filename);
  var start = process.hrtime();
  for(let i = 1; i <= numPerFile; i++) {

    var place_id = ((num + i) - numPerFile).toString();
    var lat = faker.address.latitude();
    var lng = faker.address.longitude();
    var formatted_address = faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode() + ', USA';
    var international_phone_number = "+1 " + faker.phone.phoneNumberFormat();
    var url =  faker.internet.url();
    var website = faker.internet.url();
    var day0 = '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00';
    var day1 = '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00';
    var day2 = '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00';
    var day3 = '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00';
    var day4 = '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00';
    var day5 = '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00';
    var day6 = '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00';

    file.write(`${place_id}^${lat}^${lng}^${formatted_address}^${international_phone_number}^${url}^${website}^${day0}^${day1}^${day2}^${day3}^${day4}^${day5}^${day6}\n`);
  
  }

  file.end(() => {
    var end = process.hrtime(start);
    console.log('Done in ' + end[0] + ' seconds!')
    counter++;
    if (counter <= numOfFiles) {
      filename = './data/data-part-' + counter + '.csv';
      writeFiles(num + numPerFile);
    }
  });
}

writeFiles(numPerFile);