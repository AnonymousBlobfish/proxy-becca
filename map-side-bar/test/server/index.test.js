import axios from 'axios';

console.log('Reminder: Please ensure that the server is listening on port 3000');

describe('Server', () => {
  test('responds to GET request to / with an html file', () => {
    expect.assertions(4);
    return axios.get('http://localhost:3000')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toMatch(/html/);
        expect(response.data).toMatch(/head/);
        expect(response.data).toMatch(/body/);
      }).catch((err) => {
        console.error('Error with GET request to server:', err);
      });
  });

  test('responds to GET request to /restaurants?id=ChIJFUBxSY6AhYARwOaLV7TsLjw', () => {
    expect.assertions(2);
    return axios.get('http://localhost:3000/restaurants?id=ChIJFUBxSY6AhYARwOaLV7TsLjw')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toEqual(restaurantJSON);
      }).catch((err) => {
        console.error('Error with GET request to server:', err);
      });
  });
});

var restaurantJSON = {
  "result": {
    "opening_hours": {
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1800"
          },
          "open": {
            "day": 0,
            "time": "0800"
          },
          "_id": "5a99f67af32ec1227eee69bd"
        },
        {
          "close": {
            "day": 1,
            "time": "1800"
          },
          "open": {
            "day": 1,
            "time": "0800"
          },
          "_id": "5a99f67af32ec1227eee69bc"
        },
        {
          "close": {
            "day": 2,
            "time": "1800"
          },
          "open": {
            "day": 2,
            "time": "0800"
          },
          "_id": "5a99f67af32ec1227eee69bb"
        },
        {
          "close": {
            "day": 3,
            "time": "1800"
          },
          "open": {
            "day": 3,
            "time": "0800"
          },
          "_id": "5a99f67af32ec1227eee69ba"
        },
        {
          "close": {
            "day": 4,
            "time": "1800"
          },
          "open": {
            "day": 4,
            "time": "0800"
          },
          "_id": "5a99f67af32ec1227eee69b9"
        },
        {
          "close": {
            "day": 5,
            "time": "1800"
          },
          "open": {
            "day": 5,
            "time": "0800"
          },
          "_id": "5a99f67af32ec1227eee69b8"
        },
        {
          "close": {
            "day": 6,
            "time": "1800"
          },
          "open": {
            "day": 6,
            "time": "0800"
          },
          "_id": "5a99f67af32ec1227eee69b7"
        }
      ],
      "weekday_text": [
        "Monday: 8:00 AM – 6:00 PM",
        "Tuesday: 8:00 AM – 6:00 PM",
        "Wednesday: 8:00 AM – 6:00 PM",
        "Thursday: 8:00 AM – 6:00 PM",
        "Friday: 8:00 AM – 6:00 PM",
        "Saturday: 8:00 AM – 6:00 PM",
        "Sunday: 8:00 AM – 6:00 PM"
      ],
      "open_now": true
    },
    "geometry": {
      "location": {
        "lat": 37.7867167,
        "lng": -122.4111737
      }
    },
    "formatted_address": "495 Geary St, San Francisco, CA 94102, USA",
    "international_phone_number": "+1 415-775-4700",
    "name": "Clift San Francisco",
    "place_id": "ChIJFUBxSY6AhYARwOaLV7TsLjw",
    "url": "https://maps.google.com/?cid=4336663750511421120",
    "website": "https://www.morganshotelgroup.com/originals/originals-clift-san-francisco?utm_source=Google%20My%20Business&utm_medium=Website%20Button&utm_campaign=San%20Francisco"
  },
  "_id": "5a99f67af32ec1227eee69be",
  "__v": 0
};
