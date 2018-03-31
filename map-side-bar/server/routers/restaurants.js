var express = require('express');
var router = express.Router();
var getRestaurantById = require('../../db/controllers/getRestaurantById.js');

router.use('/:id', express.static('client/dist'));

module.exports = router;
