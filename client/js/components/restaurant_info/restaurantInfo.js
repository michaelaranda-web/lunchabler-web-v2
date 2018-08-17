import React from 'react';
import { connect } from 'react-redux';
import { addPreferenceAndRefetchRestaurants } from '../../actions/preferencesActions';

export class RestaurantInfo extends React.Component {
  render() {
    return (
      <div id="restaurant-info-page">
        {
          Object.keys(this.props.usersById).map((userId) => {
            var user = this.props.usersById[userId];
            return (
              <div>
                <p>{user.name}</p>
                <div>
                  <i className="far fa-grin-beam" 
                     onClick={() => {/* REMOVE EXISTING PREFERENCE */}}></i>
                  <i className="far fa-meh"
                     onClick={() => {this.props.addPreferenceAndRefetchRestaurants(user._id, this.props.match.params.restaurant_id, "meh")}}></i>
                  <i className="far fa-angry"
                     onClick={() => {this.props.addPreferenceAndRefetchRestaurants(user._id, this.props.match.params.restaurant_id, "no")}}></i>
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