var express = require('express');
var router = express.Router();
var getRestaurantById = require('../../db/controllers/getRestaurantById.js');
var client = require('./../redis.js');
database = process.env.TOGGLE || 'mongo';

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
      client.setex(restaurantId, 100, JSON.stringify(result));
      res.send(result);
    })
  }

  if (database === 'mongo') {
    getRestaurantById.searchMongo(restaurantId).then((result) => {
      client.setex(restaurantId, 100, JSON.stringify(result));
      res.send(result);
    });
  }

});

module.exports = router;
