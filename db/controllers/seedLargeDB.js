const faker = require('faker');
const fs = require('fs');

var counter = 1;

var numPerFile = 1000000;
var numOfFiles = 10;

var filename = 'data/data-part-'+ counter +'.json';

var createFiveMillion = function(num) {
  let file = fs.createWriteStream(filename);
  var start = process.hrtime();
  for(let i = 1; i <= numPerFile; i++) {
    var User = {
        "result" : {
          "opening_hours" : {
            "open_now" : faker.random.boolean(),
            "periods" : [
              {
                "close" : {
                  "day" : 0,
                  "time" : "1800"
                },
                "open" : {
                  "day" : 0,
                  "time" : "0800"
                }
              },
              {
                "close" : {
                  "day" : 1,
                  "time" : "1800"
                },
                "open" : {
                  "day" : 1,
                  "time" : "0800"
                }
              },
              {
                "close" : {
                  "day" : 2,
                  "time" : "1800"
                },
                "open" : {
                  "day" : 2,
                  "time" : "0800"
                }
              },
              {
                "close" : {
                  "day" : 3,
                  "time" : "1800"
                },
                "open" : {
                  "day" : 3,
                  "time" : "0800"
                }
              },
              {
                "close" : {
                  "day" : 4,
                  "time" : "1800"
                },
                "open" : {
                  "day" : 4,
                  "time" : "0800"
                }
              },
              {
                "close" : {
                  "day" : 5,
                  "time" : "1800"
                },
                "open" : {
                  "day" : 5,
                  "time" : "0800"
                }
              },
              {
                "close" : {
                  "day" : 6,
                  "time" : "1800"
                },
                "open" : {
                  "day" : 6,
                  "time" : "0800"
                }
              }
            ],
            "weekday_text" : [
              "Monday: 8:00 AM – 6:00 PM",
              "Tuesday: 8:00 AM – 6:00 PM",
              "Wednesday: 8:00 AM – 6:00 PM",
              "Thursday: 8:00 AM – 6:00 PM",
              "Friday: 8:00 AM – 6:00 PM",
              "Saturday: 8:00 AM – 6:00 PM",
              "Sunday: 8:00 AM – 6:00 PM"
            ]
          },
          "geometry" : {
            "location" : {
              "lat" : faker.address.latitude(),
              "lng" : faker.address.longitude()
            }
          },
          "formatted_address" : faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode() + ', USA',
          "international_phone_number" : "+1 " + faker.phone.phoneNumberFormat(),
          "name" : faker.company.companyName(),
          "place_id" : ((num + i) - numPerFile).toString(),
          "url" : faker.internet.url(),
          "website" : faker.internet.url()
        }
      }
    if (i === 1) {
      file.write('[' + JSON.stringify(User) + ', \n');
    } else if ( i === numPerFile) {
      file.write(JSON.stringify(User) + ']');
    } else {
      file.write(JSON.stringify(User) + ', \n');
    }
  }

  file.end(() => {
    var end = process.hrtime(start);
    console.log('Done in ' + end[0] + ' seconds!')
    counter++;
    if (counter <= numOfFiles) {
      filename = 'data/data-part-' + counter + '.json';
      createFiveMillion(num + numPerFile);
    }
  });
}

createFiveMillion(numPerFile);