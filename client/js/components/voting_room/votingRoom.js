import React from 'react';
import { connect } from 'react-redux';
import { VotingOption } from './votingOption';
import { Scoreboard } from './scoreboard';
import socketIOClient from "socket.io-client";
import moment from 'moment';

export class VotingRoom extends React.Component {
  constructor(props) {
    super(props);
    
    var endpoint = 'https://lunchabler.herokuapp.com';
    if (DEVELOPMENT) {
      endpoint = 'https://lunchabler-web-v2-michaelaranda-web.c9users.io:8081'
    }
    
    this.socket = socketIOClient(endpoint);
    this.currentDayString = moment().format("YYYYMMDDhmmssSS");
    
    this.state = {
      votes: false
    };
  }
  
  componentDidMount() {
    if (Object.keys(this.props.currentUser).length === 0 && !sessionStorage.getItem("anonymous-user-id")) {
      sessionStorage.setItem("anonymous-user-id", "Anonymous" + Date.now());
    }
    
    this.socket.emit("get-current-votes", {sessionId: this.props.match.params.session_id});
    
    this.socket.on("vote-message", newVotes => {
      this.setState({ votes: newVotes })
    });
  }
  
  renderScoreboard() {
    if (this.state.votes) {
      return (
        <Scoreboard
          lunchGroupVotes={this.state.votes.lunchGroupVotes}
          restaurants={this.state.votes.restaurants}
        />
      )
    }
  }
  
  renderVotingStatus() {
    if (this.state.votes) {
      return (
        <div id="voting-status">
          {
            Object.keys(this.state.votes.lunchGroupVotes).map((lunchGroupUserId) => {
              const userName = !!this.props.usersById[lunchGroupUserId] 
                ? this.props.usersById[lunchGroupUserId].name 
                : "Anonymous";
              
              return (
                <div className="voting-status-row">
                  <label className="user-name">
                    {userName}
                  </label>
                  <span className="user-voting-status">
                    {
                      this.state.votes.lunchGroupVotes[lunchGroupUserId].length > 0
                        ? "Voted"
                        : "--"
                    }
                  </span>
                </div>
              )
            })
          }
        </div>
      )
    }
  }
  
  renderRestaurantList() {
    if (this.state.votes) {
      return this.state.votes.restaurants.map((restaurant) => {
        var userKey = Object.keys(this.props.currentUser).length === 0
          ? sessionStorage.getItem("anonymous-user-id")
          : this.props.currentUser["_id"];
        var existingVote = this.state.votes.lunchGroupVotes[userKey].find((userVotes) => {
          return userVotes.restaurant === restaurant.id
        });
        var existingVoteValue = !!existingVote ? existingVote.vote : null
        
        return (
          <VotingOption 
            existingVote={existingVoteValue}
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
        <h1>Voting Room</h1>
        <div className="scoreboard-section-container section-container">
          <h3 className="section-header">Current Votes</h3>
          <div id="scoreboard-section">
            {this.renderScoreboard()}
          </div>
        </div>
        <div className="voting-status-section-container section-container">
          <h3 className="section-header">Voting Status</h3>
          <div className="section">
            {this.renderVotingStatus()}
          </div>
        </div>
        <div className="recommendations-section-container section-container">
          <h3 className="section-header">Recommendations</h3>
          <div className="section">
            {this.renderRestaurantList()}
          </div>
        </div>
      </div>
    )
  }
  
  onVote(restaurant, vote) {
    var user = Object.keys(this.props.currentUser).length === 0 
      ? { "_id": sessionStorage.getItem("anonymous-user-id") }
      : this.props.currentUser;
    
    var voteSubmission = {
      user: user,
      restaurant: restaurant,
      vote: vote,
      session_id: this.props.match.params.session_id,
    }
    
    this.socket.emit("vote", voteSubmission);
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.ui.auth.user,
    usersById: state.entities.users.byId
  }
}

export default connect(
  mapStateToProps,
  null
)(VotingRoom);