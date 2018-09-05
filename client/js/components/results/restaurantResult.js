import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { addVisit } from '../../actions/visitsActions';

export class RestaurantResult extends React.Component {
  renderDetails() {
    var restaurant = this.props.restaurant;
    var distance = restaurant.distance ? <p>{`${restaurant.distance} miles`}</p> : null;
    
    return (
      <div className="restaurant-details-container">
        <h4>{restaurant.name}</h4>
        {distance}
      </div>
    )
  }
  
  render() {
    var restaurant = this.props.restaurant;
    
    return (
      <div className="restaurant-result">
        <Route render={({history}) => (
          <div className="restaurant-info" onClick={() => this.showRestaurantInfo(history)}>
            <div className="image-container">
              <img src={restaurant.imageUrl} />
            </div>
            {this.renderDetails()}
          </div>
        )} />
        <div className="actions-container">
          <div className="select-restaurant" onClick={() => this.restaurantSelected(restaurant._id)}>
            <i className="fas fa-utensils" />
          </div>
        </div>
      </div>
    )
  }
  
  showRestaurantInfo(history) {
    history.push(`/restaurants/${this.props.restaurant._id}`);
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