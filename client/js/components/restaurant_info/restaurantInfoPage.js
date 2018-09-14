import React from 'react';
import { connect } from 'react-redux';
import { fetchPreferences, removePreference, addPreferenceAndRefetchRestaurants } from '../../actions/preferencesActions';
import { addComment, fetchRestaurants } from '../../actions/restaurantsActions';
import { fetchRestaurantVisits } from '../../actions/visitsActions';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class RestaurantInfoPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      updating: false,
      preferences: {},
      commentUserInput: "",
      commentTextInput: "",
      visits: []
    }
  }
  
  componentDidMount() {
    this.fetchRestaurantPreferences();
    this.fetchVisits();
  }
  
  renderGeneralInfo(restaurant) {
    return (
      <div id="general-info" className="section">
        <div id="restaurant-image-container">
          {this.renderImage(restaurant)}
        </div>
        <h1>{restaurant.name}</h1>
        {this.renderYelpInfo(restaurant)}
      </div>
    )
  }
  
  renderYelpInfo(restaurant) {
    if (!!restaurant.distance) {
      return (
        <div id="general-info-content-container">
          <p>{restaurant.distance} miles</p>
          <p>{restaurant.displayAddress1}</p>
          <p>{restaurant.displayAddress2}</p>
          <a href={restaurant.url} target="_blank">More info at Yelp</a>
        </div>
      )  
    }
  }
  
  renderImage(restaurant) {
    if (!!restaurant.imageUrl) {
      return <img src={restaurant.imageUrl} />
    } else {
      return <i className="fas fa-utensils" />
    }
  }
  
  renderUpdatingMessage() {
    if (this.state.updating) {
      return <h1><strong>Updating...</strong></h1>
    }
  }
  
  renderRecentVisits() {
    if (this.state.visits.length > 0) {
      return (
        <div>
          <p>Recent visits</p>
          {
            this.state.visits.map((visit) => {
              return <p>{this.formatVisitDate(visit.date)}</p>
            })
          }
        </div>
      )
    }
  }
  
  renderExistingComments(restaurant) {
    if (!!restaurant.comments) {
      return (
        <div>
          <div>
            {
              restaurant.comments.map((comment) => {
                return <div><p>{comment.user}: </p><p>{comment.text}</p></div>  
              })
            }
          </div>
        </div>
      )
    }
  }
  
  renderAddComments() {
    return (
      <div>
        <div>
          <label>
            User:
            <input 
              value={this.state.commentUserInput} 
              onChange={(e) => {this.setState({commentUserInput: e.target.value})}}
            />
          </label>
        </div>
        <div>
          <label>
            Comment:
            <textarea 
              value={this.state.commentTextInput}
              onChange={(e) => {this.setState({commentTextInput: e.target.value})}}
            />
          </label>
        </div>
        <div>
          <button onClick={() => this.commentSubmitClick()}>Submit comment</button>
        </div>
      </div>  
    )
  }
  
  //TODO: Refactor user preference options into a UserPreferenceRow component.
  render() {
    var restaurant = this.props.restaurantsById[this.props.match.params.restaurant_id];
    
    if (!!restaurant) {
      return (
        <div id="restaurant-info-page" className="page-content">
          {this.renderGeneralInfo(restaurant)}
          {this.renderUpdatingMessage()}
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
          {this.renderRecentVisits()}
          {this.renderExistingComments(restaurant)}
          {this.renderAddComments()}
          <Link to="/results">Back to results</Link>
        </div>
      )
    } else { return null; }
  }
  
  commentSubmitClick() {
    this.setState({updating: true}, () => {
      if (this.state.commentUserInput !== "" && this.state.commentTextInput !== "") {
        addComment(this.props.match.params.restaurant_id, {
          user: this.state.commentUserInput,
          text: this.state.commentTextInput
        })
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
      } else {
        console.log("Fill out all fields before submitting comment.");  
      }
    });
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
  
  fetchVisits() {
    fetchRestaurantVisits(this.props.match.params.restaurant_id)
      .then(visits =>
        this.setState({visits: visits})
      )
  }
  
  onPreferenceClick(userId, preference) {
    if (this.state.updating) { return }
    
    this.setState({updating: true}, () => {
      var modifyPreferencePromise;
      if (preference == "yes") {
        modifyPreferencePromise = removePreference(userId, this.props.match.params.restaurant_id);
      } else {
        modifyPreferencePromise = this.props.addPreferenceAndRefetchRestaurants(userId, this.props.match.params.restaurant_id, preference)
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
  
  formatVisitDate(visitDate) {
    return moment(visitDate).format('MMMM Do YYYY');
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
    usersById: state.entities.users.byId,
    restaurantsById: state.entities.restaurants.byId
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