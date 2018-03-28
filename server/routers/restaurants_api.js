var express = require('express');
var router = express.Router();
var getRestaurantById = require('../../db/controllers/getRestaurantById.js');
database = process.env.TOGGLE || 'mongo';
var cache = require('express-redis-cache')();

router.get('/:id/sidebar', cache.route(), (req, res) => {
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
