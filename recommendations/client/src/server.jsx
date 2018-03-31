import React from 'react';
import ReactDOM  from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx'
import axios from 'axios';
// import $ from 'jquery';
// import '../dist/styles.css';

class Recommendations extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      recommended: [],
      restaurant: null
    }
    this.getRecommendedRestaurants();
  }

  componentDidMount(){
    this.getRecommendedRestaurants();
  }

  getRecommendedRestaurants(){
    // console.log(window.location.href);
    // var id = window.location.href.split('/')[4];
    // console.log('getting recommended restaurants for id: ' + id)

    var id = 5000000; // Need replace with restaurantId
    console.log('getting rest info');

    axios.get(`https://localhost:3004/api/restaurants/${id}/recommendations`)
      .then(function (response) {
        console.log('get success from client!', response);
        this.setState({
          restaurant: response[0],
          recommended: response[1]
        });
      })
      .catch(function (error) {
        console.log('axios error was ', error);
      });

    // $.ajax({
    //   url: `/api/restaurants/${id}/recommendations`,
    //   method: 'GET',
    //   success: (data) => {
        // console.log('get success from client!', data);
        // this.setState({
        //   restaurant: data[0],
        //   recommended: data[1]
        // });
    //   },
    //   error: (data) => {
    //     console.log('get error from client!', data);
    //   }
    // })
  }

  goToRestaurant(id){
    console.log('go to restaurant ' + id)
    location.href = '/restaurants/' + id;
  }

  render(){
    return(
      <div>
        <div className="recommendations-title">More Restaurants Near {this.state.restaurant ? this.state.restaurant.name : '...'}</div>
        <div className="recommendations-container">
          {this.state.recommended.map((restaurant, index) => (
            <RestaurantCard restaurant={restaurant} key={index} switchRestaurant={this.goToRestaurant.bind(this)}/>
          ))}
        </div>
      </div>
    )
  }
}

export default Recommendations;

// ReactDOM.render(<App />, document.getElementById('recommendations-app'));
