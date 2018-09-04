import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addVisit } from '../../actions/visitsActions';

export class RestaurantResult extends React.Component {
  render() {
    var restaurant = this.props.restaurant;
    
    return (
      <div className="restaurant-result">
        <div className="image-container">
          <img src={restaurant.imageUrl} />
        </div>
        <div className="restaurant-details-container">
          <h4>{restaurant.name}</h4>
        </div>
        <div className="actions-container">
          <Link to={`/restaurants/${restaurant._id}`}>More Info</Link>
          <a onClick={() => this.restaurantSelected(restaurant._id)}>I choose you!</a>
        </div>
      </div>
    )
  }
  
  restaurantSelected(restaurantId) {
    addVisit(restaurantId)
      .then(() => {
        console.log("successfully added a visit");
      });
  }
}

const mapStateToProps = state => {
  return {
    restaurantsById: state.entities.restaurants.byId
  }
}

export default connect(
  mapStateToProps,
  null
)(RestaurantResult);