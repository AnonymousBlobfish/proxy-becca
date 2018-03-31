var database = require('../models/restaurant.js');

module.exports = (id) => {
  return database.find({ 'result.place_id': id })
    .then((result) => {
      return result[0];
    });
};
