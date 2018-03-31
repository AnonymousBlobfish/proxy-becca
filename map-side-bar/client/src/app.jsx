import React from 'react';
import axios from 'axios';
import { InfoList } from './InfoList.jsx';
import MapContainer from './MapContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: props.restaurant
    };
    this.getRestaurantData(props.restaurantId);
  }

  getRestaurantData (id) {
    axios.get(location.origin + '/api/restaurants/' + id + '/sidebar')
      .then((response) => {
        console.log('received:', response);
        this.setState({ restaurant: response.data.result });
      }).catch((err) => {
        console.error('Failed to fetch restaurant data from server:', err);
      });
  }

  render() {
    if (!this.state.restaurant) {
      return <div> Loading Sidebar... </div>;
    } else {
      return (
        <div className="sidebar-flexbox-col sidebar-app">
          <InfoList restaurant={this.state.restaurant} />
          <MapContainer geometry={this.state.restaurant.geometry} />
        </div>
      );
    }
  }
}

export { App };
