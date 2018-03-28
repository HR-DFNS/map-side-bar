var express = require('express');
var router = express.Router();
var getRestaurantById = require('../../db/controllers/getRestaurantById.js');
database = process.env.TOGGLE || 'mongo';

const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT;

const client = redis.createClient(REDIS_PORT);

function cache(req, res, next) {
    const org = req.query.org;
    client.get(org, function (err, data) {
        if (err) throw err;
        if (data != null) {
            res.send(respond(org, data));
        } else {
            next();
        }
    });
}

router.get('/:id/sidebar', (req, res) => {
  var restaurantId = req.params.id;
  
  if (database === 'mysql') {
    getRestaurantById.searchMySQL(restaurantId).then((result) => {
      res.send(result);
    })
  }

  if (database === 'mongo') {
    getRestaurantById.searchMongo(restaurantId).then((result) => {
      res.send(result);
    });
  }

});

module.exports = router;
