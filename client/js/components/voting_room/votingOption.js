import React from 'react';

export class VotingOption extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      votedUp: false
    };
  }
  
  voteButtonClass() {
    return this.state.votedUp ? "voted-up" : ""; 
  }
  
  render() {
      return (
        <div className="voting-option">
          <span className="restaurant-name">{this.props.restaurant.name}</span>
          <i 
            onClick={() => this.onVoteButtonClick()} 
            className={`far fa-arrow-alt-circle-up ${this.voteButtonClass()}`}>
          </i>
        </div>
      )
          
  }
  
  onVoteButtonClick() {
    this.setState({
      votedUp: !this.state.votedUp
    }, () => {
      var vote = this.state.votedUp ? "yes" : "no-preference"
      this.props.onVote(this.props.restaurant, vote)
    })
  }
}
