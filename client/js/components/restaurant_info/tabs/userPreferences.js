import React from 'react';
import { connect } from 'react-redux';
import { fetchPreferences, removePreference, addPreference } from '../../../actions/preferencesActions';
import { fetchRestaurants } from '../../../actions/restaurantsActions';

export class UserPreferences extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      updating: false,
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
        </div>
      )
    } else { return null; }
  }
  
  fetchRestaurantPreferences() {
    var self = this;
    
    return new Promise((resolve) => {
      fetchPreferences(this.props.restaurant._id)
        .then(preferences =>
          self.setState({preferences: preferences}, () => {
            resolve();
          })
        )
    })
  }
  
  onPreferenceClick(userId, preference) {
    if (this.state.updating) { return }
    
    this.setState({updating: true}, () => {
      var modifyPreferencePromise;
      
      if (preference == "yes") {
        modifyPreferencePromise = removePreference(userId, this.props.restaurant._id);
      } else {
        modifyPreferencePromise = addPreference(userId, this.props.restaurant._id, preference)
      }
      
      modifyPreferencePromise
        .then(() => {
          return this.fetchRestaurantPreferences();
        })
        .then(() => {
          return this.props.fetchRestaurants();
        })
        .then(() => {
          this.setState({updating: false});
        })
      .catch((err) => {
        console.log(err);
        this.setState({updating: false});
      })
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
    fetchRestaurants: () => { dispatch(fetchRestaurants()) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPreferences);