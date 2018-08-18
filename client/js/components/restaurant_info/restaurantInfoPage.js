import React from 'react';
import { connect } from 'react-redux';
import { addPreferenceAndRefetchRestaurants } from '../../actions/preferencesActions';
import fetch from 'cross-fetch';

export class RestaurantInfoPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      preferences: {}
    }
  }
  
  componentDidMount() {
    this.fetchRestaurantPreferences();
  }
  
  render() {
    return (
      <div id="restaurant-info-page">
        {
          Object.keys(this.props.usersById).map((userId) => {
            var user = this.props.usersById[userId];
            return (
              <div className="user-preference-options">
                <p>{user.name}</p>
                <div>
                  <i className={`far fa-grin-beam ${this.currentPreferenceClass(user._id, "none")}`}
                     onClick={() => {/* REMOVE EXISTING PREFERENCE */}}></i>
                  <i className={`far fa-meh ${this.currentPreferenceClass(user._id, "meh'")}`}
                     onClick={() => {this.props.addPreferenceAndRefetchRestaurants(user._id, this.props.match.params.restaurant_id, "meh", this.props.lunchGroup)}}></i>
                  <i className={`far fa-angry ${this.currentPreferenceClass(user._id, "no")}`}
                     onClick={() => {this.props.addPreferenceAndRefetchRestaurants(user._id, this.props.match.params.restaurant_id, "no", this.props.lunchGroup)}}></i>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  
  currentPreferenceClass(userId, preference) {
    if (this.state.preferences[userId] == preference) {
      return "current-preference";
    }
    return "";
  }
  
  fetchRestaurantPreferences() {
    var self = this;
    
    fetch(`/api/preferences?restaurant=${this.props.match.params.restaurant_id}`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      ).then(preferences =>
        self.setState({preferences: preferences})
      )
  }
}

const mapStateToProps = state => {
  return {
    usersById: state.entities.users.byId,
    lunchGroup: state.ui.lunchGroup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPreferenceAndRefetchRestaurants: (userId, restaurantId, preference, lunchGroup) => { dispatch(addPreferenceAndRefetchRestaurants(userId, restaurantId, preference, lunchGroup))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantInfoPage);