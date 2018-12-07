import React from 'react';
import { connect } from 'react-redux';
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
  
  renderTopChoices() {
    const numChoicesToShow = 5;
    var topChoices = this.props.sortedRestaurants.slice(0,numChoicesToShow);
    
    return (
      <div id="top-choices">
        {
          topChoices.map((restaurantChoice) => {
            var scoreToDisplay = "Loading...";
            
            if (this.state.votes) {
              var votesForRestaurant = this.state.votes[restaurantChoice._id];
              
              scoreToDisplay = votesForRestaurant ? String(votesForRestaurant.score) : "0";
            }
          
            return (
              <div className="restaurant-choice">
                {restaurantChoice.name}
                <button onClick={() => this.onVote(restaurantChoice._id, "yes")}>Up</button>
                <button onClick={() => this.onVote(restaurantChoice._id, "no")}>Down</button>
                <span>
                  {scoreToDisplay}
                </span>
              </div>
            )
          })
        }
      </div>  
    )
  }
  
  render() {
    if (this.props.sortedRestaurants) {
      return (
        <div id="voting-room-page" className="page-content">
          {this.renderTopChoices()}
        </div>
      )
    } else { return null }
    
  }
  
  onVote(restaurantId, vote) {
    var voteSubmission = {
      restaurantId: restaurantId,
      vote: vote,
      session_id: this.props.match.params.session_id
    }
    this.socket.emit("vote", voteSubmission);
  }
}

const mapStateToProps = state => {
  return {
    sortedRestaurants: state.entities.restaurants.sorted
  }
}

export default connect(
  mapStateToProps,
  null
)(VotingRoom);
