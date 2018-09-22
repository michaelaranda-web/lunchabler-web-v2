import React from 'react';
import { connect } from 'react-redux';
import { fetchUserPreferences } from '../../actions/preferencesActions';

export class UserPreferences extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      updating: false,
      preferences: {}
    }
  }
  
  componentDidMount() {
    this.fetchUserPreferences(this.props.user._id);
  }
  
  renderUpdating() {
    if (this.state.updating) {
      return <h1>Updating</h1>
    }
  }
  
  render() {
    if (this.props.sortedRestaurants) {
      return (
        <div id="user-preferences" className="page-content">
          {
            this.props.sortedRestaurants.map((restaurant, i) => {
              return <div>{restaurant.name}</div>
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
}

const mapStateToProps = state => {
  return {
    sortedRestaurants: state.entities.restaurants.sorted
  }
}

export default connect(
  mapStateToProps,
  null
)(UserPreferences);