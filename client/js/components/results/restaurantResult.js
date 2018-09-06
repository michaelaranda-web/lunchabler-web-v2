import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { addVisit } from '../../actions/visitsActions';

export class RestaurantResult extends React.Component {
  renderDetails(restaurant) {
    var distance = restaurant.distance ? <p>{`${restaurant.distance} miles`}</p> : null;
    
    return (
      <div className="restaurant-details-container">
        <h4>{restaurant.name}</h4>
        {distance}
      </div>
    )
  }
  
  renderImage(restaurant) {
    if (!!restaurant.imageUrl) {
      return <img src={restaurant.imageUrl} />
    } else {
      return <i className="fas fa-camera" />
    }
  }
  
  renderRank() {
    var rankClass;
    
    switch (this.props.rank) {
      case 1:
        rankClass = "gold"
        break;
      case 2:
        rankClass = "silver"
        break;
      case 3:
        rankClass = "bronze"
        break;
      default:
        rankClass = "";
    }
    
    return (
      <div className={`restaurant-rank ${rankClass}`}>{this.props.rank}</div>  
    )
  }
  
  render() {
    var restaurant = this.props.restaurant;
    
    return (
      <div className="restaurant-result">
        <Route render={({history}) => (
          <div className="restaurant-info" onClick={() => this.showRestaurantInfo(history)}>
            {this.renderRank()}
            <div className="image-container">
              {this.renderImage(restaurant)}
            </div>
            {this.renderDetails(restaurant)}
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