import React from 'react';
import { connect } from 'react-redux';
import { AddRestaurant } from './addRestaurant';

export class ManageRestaurantsPage extends React.Component {
  render() {
    return (
      <div id="manage-restaurants-page" className="page-content">
        {
          Object.keys(this.props.restaurantsById).map((restaurantId) => {
            return <p>{this.props.restaurantsById[restaurantId].name}</p>
          })
        }
        <AddRestaurant />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurantsById: state.entities.restaurants.byId
  }
}

export default ManageRestaurantsPage = connect(
  mapStateToProps,
  null
)(ManageRestaurantsPage);