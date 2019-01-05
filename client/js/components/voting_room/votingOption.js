import React from 'react';

export class VotingOption extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      thumbsUp: false,
      thumbsDown: false,
    };
  }
  
  voteButtonClass(buttonType) {
    if (buttonType === "thumbs-up") {
      return this.state.thumbsUp ? "active" : ""; 
    } else {
      return this.state.thumbsDown ? "active" : ""; 
    } 
  }
  
  render() {
      return (
        <div className="voting-option">
          <span className="restaurant-name">{this.props.restaurant.name}</span>
          <i 
            onClick={() => this.onVoteButtonClick("thumbs-up")}
            className={`fas fa-thumbs-up ${this.voteButtonClass("thumbs-up")}`}>
          </i>
          <i 
            onClick={() => this.onVoteButtonClick("thumbs-down")}
            className={`fas fa-thumbs-down ${this.voteButtonClass("thumbs-down")}`}>
          </i>
        </div>
      )
          
  }
  
  onVoteButtonClick(buttonType) {
    var vote;
    
    if (buttonType === "thumbs-up") {
      this.setState({
        thumbsUp: !this.state.thumbsUp,
        thumbsDown: false
      }, () => {
        vote = this.state.thumbsUp ? "yes" : "no-preference";
        this.props.onVote(this.props.restaurant, vote);
      })
    } else {
      this.setState({
        thumbsDown: !this.state.thumbsDown,
        thumbsUp: false
      }, () => {
        vote = this.state.thumbsDown ? "no" : "no-preference";
        this.props.onVote(this.props.restaurant, vote);
      }) 
    } 
  }
}
