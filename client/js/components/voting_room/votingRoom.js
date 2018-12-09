import React from 'react';
import { VotingOption } from './votingOption';
import { Scoreboard } from './scoreboard';
import socketIOClient from "socket.io-client";
import moment from 'moment';

export class VotingRoom extends React.Component {
  constructor(props) {
    super(props);
    
    var endpoint = 'https://lunchabler.herokuapp.com';
    if (DEVELOPMENT) {
      endpoint = 'http://lunchabler-web-v2-michaelaranda-web.c9users.io:8081'
    }
    
    this.socket = socketIOClient(endpoint);
    this.currentDayString = moment().format("YYYYMMDDhmmssSS");
    
    this.state = {
      votes: false
    };
  }
  
  componentDidMount() {
    this.socket.emit("get-current-votes", {sessionId: this.props.match.params.session_id});
    
    this.socket.on("vote-message", newVotes => {
      this.setState({ votes: newVotes })
    });
  }
  
  renderScoreboard() {
    if (this.state.votes) {
      return (
        <Scoreboard
          restaurants={this.state.votes.restaurants}
        />
      )
    }
  }
  
  renderRestaurantList() {
    if (this.state.votes) {
      return this.state.votes.restaurants.map((restaurant) => {
        return (
          <VotingOption 
            restaurant={restaurant}
            onVote={this.onVote.bind(this)}
          />
        )
      })
    }
  }
  
  render() {
    return (
      <div id="voting-room-page" className="page-content">
        {this.renderScoreboard()}
        {this.renderRestaurantList()}
      </div>
    )
  }
  
  onVote(restaurant, vote) {
    var voteSubmission = {
      restaurant: restaurant,
      vote: vote,
      session_id: this.props.match.params.session_id
    }
    this.socket.emit("vote", voteSubmission);
  }
}
