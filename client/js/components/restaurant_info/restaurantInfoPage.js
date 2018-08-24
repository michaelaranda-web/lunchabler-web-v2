import React from 'react';
import { connect } from 'react-redux';
import { fetchPreferences, removePreference, addPreferenceAndRefetchRestaurants } from '../../actions/preferencesActions';
import { fetchRestaurants } from '../../actions/restaurantsActions';

export class RestaurantInfoPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      addingPreference: false,
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
                <label className="user-name">{user.name}</label>
                <div className="preference-options">
                  <i className={`far fa-grin-beam ${this.currentPreferenceClass(user._id, "yes")}`}
                     onClick={() => this.onPreferenceClick(user._id, "yes")}></i>
                  <i className={`far fa-meh ${this.currentPreferenceClass(user._id, "meh")}`}
                     onClick={() => this.onPreferenceClick(user._id, "meh")}></i>
                  <i className={`far fa-angry ${this.currentPreferenceClass(user._id, "no")}`}
                     onClick={() => this.onPreferenceClick(user._id, "no")}></i>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  
  fetchRestaurantPreferences() {
    var self = this;
    
    return new Promise((resolve) => {
      fetchPreferences(this.props.match.params.restaurant_id)
        .then(preferences =>
          self.setState({preferences: preferences}, () => {
            resolve();
          })
        )
    })
  }
  
  onPreferenceClick(userId, preference) {
    if (this.state.addingPreference) { return }
    
    this.setState({addingPreference: true}, () => {
      if (preference === "yes") {
        removePreference(userId, this.props.match.params.restaurant_id)
          .then(() => {
            return this.fetchRestaurantPreferences();
          })
          .then(() => {
            return this.props.fetchRestaurants();
          })
          .then(() => {
            this.setState({addingPreference: false});
          })
        .catch((err) => {
          console.log(err)
        })
      } else {
        this.props.addPreferenceAndRefetchRestaurants(userId, this.props.match.params.restaurant_id, preference)
        .then(() => {
          this.fetchRestaurantPreferences();
        })
        .then(() => {
          this.setState({addingPreference: false});
        })  
      }
    });
  }
  
  currentPreferenceClass(userId, preference) {
    var noPref = this.state.preferences[userId] == undefined && preference == "yes";
    var prefExists = this.state.preferences[userId] == preference;
    if (prefExists || noPref) {
      return "current-preference";
    }
    return "";
  }
}

const mapStateToProps = state => {
  return {
    usersById: state.entities.users.byId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPreferenceAndRefetchRestaurants: (userId, restaurantId, preference) => { return dispatch(addPreferenceAndRefetchRestaurants(userId, restaurantId, preference))},
    fetchRestaurants: () => { return dispatch(fetchRestaurants())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantInfoPage);