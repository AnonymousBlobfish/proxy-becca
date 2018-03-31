import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './app.jsx';
import '../dist/styles.css';
import '../dist/fontawesome-all.min.js';

var restaurantId = location.pathname.split('restaurants/')[1];
console.log('restaurant id is', restaurantId)
if (restaurantId[restaurantId.length - 1] === '/') {
  restaurantId = restaurantId.substring(0, restaurantId.length - 1);
}

ReactDOM.render(<App restaurantId={restaurantId} restaurant={null}/>, document.getElementById('sidebar-app'));
