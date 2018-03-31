import data from './restaurants_data_test.js';
import database from '../../../db/models/restaurant.js';

describe('database', () => {
  it('should count, insert, find, and remove restaurants', () => {
    expect.assertions(3);
    var count;
    return database.count({})
      .then((result) => {
        count = result;
        return database.insert([data]);
      }).then((result) => {
        return database.count({});
      }).then((result) => {
        expect(result).toBe(count + 1);
        return database.find({'result.place_id': 'TEST_PLACE_ID'});
      }).then((result) => {
        expect(result[0].result.name).toBe('Tom\'s Bistro, the test restaurant');
        return database.remove({'result.place_id': 'TEST_PLACE_ID'});
      }).then((result) => {
        return database.count({});
      }).then((result) => {
        database.mongoose.disconnect();
        expect(result).toBe(count);
      }).catch((err) => {
        console.error('Database Error:', err);
        database.mongoose.disconnect();
      });
  });
});
