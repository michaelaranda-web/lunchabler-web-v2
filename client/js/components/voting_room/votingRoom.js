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
            this.state.votes.parameters.lunchGroup.map((lunchGroupUserId) => {
              const user = this.props.usersById[lunchGroupUserId];
              
              return (
                <div className="voting-status-row">
                  <label className="user-name">
                    {user.name}
                  </label>
                  <span className="user-voting-status">
                    {
                      this.state.votes.lunchGroupVotes[lunchGroupUserId].length > 0
                        ? "Submitted votes"
                        : "No votes yet"
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
        <h1>Voting Room</h1>
        <h3 className="section-header">Current Votes</h3>
        <div id="scoreboard-section" className="section">
          {this.renderScoreboard()}
        </div>
        <h3 className="section-header">Voting Status</h3>
        <div className="section">
          {this.renderVotingStatus()}
        </div>
        <h3 className="section-header">Recommendations</h3>
        <div className="section">
          {this.renderRestaurantList()}
        </div>
      </div>
    )
  }
  
  onVote(restaurant, vote) {
    var voteSubmission = {
      user: this.props.currentUser,
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