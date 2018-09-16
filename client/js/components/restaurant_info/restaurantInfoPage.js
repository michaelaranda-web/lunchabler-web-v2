import React from 'react';
import { connect } from 'react-redux';
import { addComment, fetchRestaurants } from '../../actions/restaurantsActions';
import { Link } from 'react-router-dom';
import { GeneralInfo } from './tabs/generalInfo';
import UserPreferences from './tabs/userPreferences';

export class RestaurantInfoPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      updating: false,
      commentUserInput: "",
      commentTextInput: ""
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
          <GeneralInfo restaurant={restaurant} />
          <UserPreferences restaurant={restaurant} />
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
}

const mapStateToProps = state => {
  return {
    restaurantsById: state.entities.restaurants.byId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants: () => { return dispatch(fetchRestaurants())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantInfoPage);