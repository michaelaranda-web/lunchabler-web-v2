import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GeneralInfo } from './tabs/generalInfo';
import UserPreferences from './tabs/userPreferences';
import Comments from './tabs/comments';

export class RestaurantInfoPage extends React.Component {
  render() {
    var restaurant = this.props.restaurantsById[this.props.match.params.restaurant_id];
    
    if (!!restaurant) {
      return (
        <div id="restaurant-info-page" className="page-content">
          <GeneralInfo restaurant={restaurant} />
          <UserPreferences restaurant={restaurant} />
          <Comments restaurant={restaurant} />
          <Link to="/results">Back to results</Link>
        </div>
      )
    } else { return null; }
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
)(RestaurantInfoPage);