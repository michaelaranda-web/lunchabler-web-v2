import React from 'react';
import { connect } from 'react-redux';
import { addPreferenceAndRefetchRestaurants } from '../../actions/preferencesActions';

export class RestaurantInfo extends React.Component {
  render() {
    return (
      <div id="restaurant-info-page">
        {
          Object.keys(this.props.usersById).map((userId) => {
            return (
              <div>
                <p>{this.props.usersById[userId].name}</p>
                <div>
                  <i className="fa fa-grin-beam"></i>
                  <i className="fa fa-meh"></i>
                  <i className="fa fa-angry"></i>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usersById: state.entities.users.byId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPreferenceAndRefetchRestaurants: (userId, restaurantId, preference) => { dispatch(addPreferenceAndRefetchRestaurants(userId, restaurantId, preference))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantInfo);