import React from 'react';
import { connect } from 'react-redux';
import { fetchPreferences, removePreference, addPreferenceAndRefetchRestaurants } from '../../actions/preferencesActions';
import { addComment, fetchRestaurants } from '../../actions/restaurantsActions';
import { Link } from 'react-router-dom';

export class RestaurantInfoPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      addingPreference: false,
      preferences: {},
      comments: [],
      commentUserInput: "",
      commentTextInput: ""
    }
  }
  
  componentDidMount() {
    this.fetchRestaurantPreferences();
  }
  
  renderCommentsSection() {
    return (
      <div>
        <div>
          {
            this.state.comments.map((comment) => {
              return <p>{comment}</p>  
            })
          }
        </div>
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
      </div>
    )
  }
  
  //TODO: Refactor user preference options into a UserPreferenceRow component.
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
        {this.renderCommentsSection()}
        <Link to="/results">Back to results</Link>
      </div>
    )
  }
  
  commentSubmitClick() {
    if (this.state.commentUserInput !== "" && this.state.commentTextInput !== "") {
      addComment(this.props.match.params.restaurant_id, {
        user: this.state.commentUserInput,
        text: this.state.commentTextInput
      })
    }
    
    console.log("Fill out all fields before submitting comment.");
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
            this.setState({addingPreference: false});
          })
      .catch((err) => {
        console.log(err)
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
    addPreferenceAndRefetchRestaurants: (userId, restaurantId, preference) => { return dispatch(addPreferenceAndRefetchRestaurants(userId, restaurantId, preference))},
    fetchRestaurants: () => { return dispatch(fetchRestaurants())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantInfoPage);