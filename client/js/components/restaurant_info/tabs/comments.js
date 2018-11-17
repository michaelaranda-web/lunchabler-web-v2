import React from 'react';
import { connect } from 'react-redux';
import { addComment, fetchRestaurants } from '../../../actions/restaurantsActions';

export class Comments extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      updating: false,
      commentUserInput: "",
      commentTextInput: ""
    }
  }
  
  renderExistingComments() {
    if (!!this.props.restaurant.comments) {
      return (
        <div id="existing-comments-section" className="restaurant-info-section">
          <span className="section-label">COMMENTS</span>
          <div className="section-content">
            {
              this.props.restaurant.comments.map((comment) => {
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
      <div id="add-comment-section" className="restaurant-info-section">
        <span className="section-label">ADD COMMENT</span>
        <div className="section-content">
          <div className="field">
            <label>
              User:
              <input 
                value={this.state.commentUserInput} 
                onChange={(e) => {this.setState({commentUserInput: e.target.value})}}
              />
            </label>
          </div>
          <div className="field">
            <label>
              Comment:
              <textarea 
                value={this.state.commentTextInput}
                onChange={(e) => {this.setState({commentTextInput: e.target.value})}}
              />
            </label>
          </div>
          <div className="button-row">
            <a 
              className="submit-button"
              onClick={() => this.commentSubmitClick()}>
              Submit comment
            </a>
          </div>
        </div>
      </div>
    )
  }
  
  render() {
    return (
      <div id="comments-tab">
        {this.renderExistingComments()}
        {this.renderAddComments()}
      </div>
    )
  }
  
  commentSubmitClick() {
    this.setState({updating: true}, () => {
      if (this.state.commentUserInput !== "" && this.state.commentTextInput !== "") {
        addComment(this.props.restaurant._id, {
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

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants: () => { return dispatch(fetchRestaurants()) }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comments);