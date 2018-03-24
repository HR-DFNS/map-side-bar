const faker = require('faker');
const fs = require('fs');

var counter = 1;

var numPerFile = 1000000;
var numOfFiles = 10;

var filename = 'data/data-part-'+ counter +'.json';

var writeFiles = function(num) {
  let file = fs.createWriteStream(filename);
  var start = process.hrtime();
  for(let i = 1; i <= numPerFile; i++) {
    var Restaurant = {
      "_id" : ((num + i) - numPerFile),
      "place_id" : ((num + i) - numPerFile).toString(),
      "day0": '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00',
      "day1": '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00',
      "day2": '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00',
      "day3": '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00',
      "day4": '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00',
      "day5": '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00',
      "day6": '0' + faker.random.number({min:5, max:9}) + '00/' + faker.random.number({min:17, max:21}) + '00',
      "lat" : faker.address.latitude(),
      "lng" : faker.address.longitude(),
      "address" : faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode() + ', USA',
      "phone" : "+1 " + faker.phone.phoneNumberFormat(),
      "url" : faker.internet.url(),
      "website" : faker.internet.url()
    }

    if (i === 1) {
      file.write('[' + JSON.stringify(Restaurant) + ', \n');
    } else if ( i === numPerFile) {
      file.write(JSON.stringify(Restaurant) + ']');
    } else {
      file.write(JSON.stringify(Restaurant) + ', \n');
    }
  }

  file.end(() => {
    var end = process.hrtime(start);
    console.log('Done in ' + end[0] + ' seconds!')
    counter++;
    if (counter <= numOfFiles) {
      filename = 'data/data-part-' + counter + '.json';
      writeFiles(num + numPerFile);
    }
  });
}

writeFiles(numPerFile);