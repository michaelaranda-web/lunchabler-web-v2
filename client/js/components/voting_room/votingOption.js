import React from 'react';

export class VotingOption extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentVote: null
    };
  }
  
  render() {
      return (
        <div>
          {this.props.restaurant.name}
          <button onClick={() => this.onVote(this.props.restaurant._id, "yes")}>Up</button>
          <button onClick={() => this.onVote(this.props.restaurant._id, "no")}>Down</button>
        </div>
      )
          
  }
  
  onVote(restaurantId, vote) {
    if (this.state.currentVote === vote) {
      return;
    } else {
      this.setState({
        currentVote: vote
      })
      
      this.props.onVote(restaurantId, vote); 
    }
  }
}
