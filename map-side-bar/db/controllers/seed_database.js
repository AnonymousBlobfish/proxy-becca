var data = require('../../restaurants_data.js');
var database = require('../models/restaurant.js');

database.insert(data)
  .then((response) => {
    database.mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Failed to seed database');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    database.mongoose.disconnect();
  });
