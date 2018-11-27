import React from 'react';
import { connect } from 'react-redux';
import { PreferenceOptions } from '../../preferenceOptions';
import { fetchRestaurantPreferences, removePreference, addPreference } from '../../../actions/preferencesActions';
import { fetchRestaurants } from '../../../actions/restaurantsActions';

export class UserPreferences extends React.Component {
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
    //TODO: If restaurant is null or preferences is empty, return loading page / make a shared loading page for all tabs
    if (!!this.props.restaurant) {
      return (
        <div id="user-preferences-container" className="restaurant-info-section">
          <span className="section-label">PREFERENCES</span>
          <div id="user-preferences" className="section-content">
            {
              Object.keys(this.props.usersById).map((userId) => {
                var user = this.props.usersById[userId];
                
                return (
                  <div className="user-preference-options">
                    <label className="preference-label">{user.name}</label>
                    <PreferenceOptions 
                      currentPreference={this.state.preferences[userId]}
                      onPreferenceClick={(preference) => this.onPreferenceClick(userId, preference)}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    } else { return null; }
  }
  
  fetchRestaurantPreferences() {
    var self = this;
    
    return new Promise((resolve) => {
      fetchRestaurantPreferences(this.props.restaurant._id)
        .then(preferences =>
          self.setState({preferences: preferences}, () => {
            resolve();
          })
        )
    })
  }
  
  onPreferenceClick(userId, preference) {
    return addPreference(userId, this.props.restaurant._id, preference)
      .then(() => {
        return this.fetchRestaurantPreferences();
      })
      .then(() => {
        return this.props.fetchRestaurants();
      })
      .then(() => {
        Promise.resolve();
      })
      .catch(error => { console.error(error); return Promise.reject(error); });
  }
}

const mapStateToProps = state => {
  return {
    usersById: state.entities.users.byId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants: () => { dispatch(fetchRestaurants()) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPreferences);