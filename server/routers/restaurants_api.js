var express = require('express');
var router = express.Router();
var getRestaurantById = require('../../db/controllers/getRestaurantById.js');
database = process.env.TOGGLE || 'mongo';

const redis = require('redis');
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);

function cache(req, res, next) {
    const id = req.params.id;
    client.get(id, function (err, data) {
      if (err) throw err;
      if (data != null) res.send(data); 
      else next();
    });
}

router.get('/:id/sidebar', cache, (req, res) => {
  var restaurantId = req.params.id;
  
  if (database === 'mysql') {
    getRestaurantById.searchMySQL(restaurantId).then((result) => {
      client.setex(restaurantId, 10, JSON.stringify(result));
      res.send(result);
    })
  }

  if (database === 'mongo') {
    getRestaurantById.searchMongo(restaurantId).then((result) => {
      client.setex(restaurantId, 10, JSON.stringify(result));
      res.send(result);
    });
  }

});

module.exports = router;
