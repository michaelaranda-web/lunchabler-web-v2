import React from 'react';
import { connect } from 'react-redux';
import { PreferenceOptions } from '../preferenceOptions';
import { fetchUserPreferences, addPreference } from '../../actions/preferencesActions';
import { fetchRestaurants } from '../../actions/restaurantsActions';

export class UserPreferences extends React.Component {
  constructor(props) {
    super(props);
    
    this.restaurantsPerTab = 10;
    
    this.state = {
      updating: false,
      preferences: {},
      numTabs: Math.ceil(this.props.sortedRestaurants.length / this.restaurantsPerTab),
      preferenceTabIndex: 0
    }
  }
  
  componentDidMount() {
    this.fetchUserPreferences(this.props.user._id);
  }
  
  renderTabs() {
    var tabs = [];
    
    for (let i = 0; i < this.state.numTabs; i++) {
      var activeClass = this.state.preferenceTabIndex === i ? 'active' : '';

      tabs.push(
        <div className={`tab ${activeClass}`} onClick={ () => this.onTabClick(i)  }>
          {i+1}
        </div>);
    }
    
    return (
      <div className="preferences-tabs">
        {
          tabs.map((tab) => {
            return tab
          })
        }
      </div>  
    )
  }
  
  render() {
    if (this.props.sortedRestaurants) {
      return (
        <div className="user-preferences">
          {this.renderTabs()}
          {
            this.props.sortedRestaurants.map((restaurant, i) => {
              var preferenceForRestaurant = this.state.preferences[restaurant._id];
            
              return (
                <div className={`user-preference-options ${this.showForTabIndex(i)}`}>
                  <label className="preference-label">{restaurant.name}</label>
                  <PreferenceOptions 
                    currentPreference={preferenceForRestaurant}
                    onPreferenceClick={(preference) => this.onPreferenceClick(restaurant._id, preference)}
                  />
                  
                </div>
              )
            })
          }
        </div>
      );
    } else { return null }
  }
  
  fetchUserPreferences(userId) {
    var self = this;
    
    self.setState({updating: true}, () => {
      var promise = new Promise((resolve, reject) => {
        fetchUserPreferences(this.props.user._id)
          .then(preferences =>
            self.setState({preferences: preferences}, () => {
              resolve();
            }))
          .catch(error =>
            reject(error)
          ) 
      })
      
      promise.then(() => {
        self.setState({updating: false});
      })
    })
  }
  
  onPreferenceClick(restaurantId, preference) {
    return addPreference(this.props.user._id, restaurantId, preference)
      .then(() => {
        return this.fetchUserPreferences();
      })
      .then(() => {
        return this.props.fetchRestaurants();
      })
      .then(() => {
        Promise.resolve();
      })
    .catch(error => { console.error(error); return Promise.reject(error); });
  }
  
  onTabClick(tabIndex) {
    this.setState({
      preferenceTabIndex: tabIndex
    })
  }
  
  showForTabIndex(index) {
    let tabIndex = Math.floor(index/this.restaurantsPerTab);
    return this.state.preferenceTabIndex === tabIndex ? '' : 'hide';
  }
}

const mapStateToProps = state => {
  return {
    sortedRestaurants: state.entities.restaurants.sorted
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