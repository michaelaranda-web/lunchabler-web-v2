import React from 'react';
import { connect } from 'react-redux';
import { alphabetizedRestaurants } from '../../helpers/helpers';
import { RestaurantListItem } from './restaurantListItem';

export class RestaurantList extends React.Component {
  render() {
    return (
      <div id="restaurant-list">
        {
          alphabetizedRestaurants(this.props.restaurantsById).map((restaurant) => {
            return <RestaurantListItem restaurant={restaurant} />
          })    
        }
      </div>
    )
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
)(RestaurantList);          