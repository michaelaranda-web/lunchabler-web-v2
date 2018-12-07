import React from 'react';
import { connect } from 'react-redux';
import { VotingOption } from './votingOption';
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
    if (this.props.restaurantsById && this.state.votes) {
      var votedRestaurants = this.state.votes.votedRestaurants || {};
      
      var restaurantsRankedByVotes = Object.entries(votedRestaurants).sort(this.votedRestaurantsSort);
      var restaurantOneName = "-";
      var restaurantOneScore = "-";
      var restaurantTwoName = "-";
      var restaurantTwoScore = "-";
      var restaurantThreeName = "-";
      var restaurantThreeScore = "-";
      
      
      if (restaurantsRankedByVotes[0]) {
        restaurantOneName = this.props.restaurantsById[restaurantsRankedByVotes[0][0]].name;
        restaurantOneScore = restaurantsRankedByVotes[0][1].score;
      }
      
      if (restaurantsRankedByVotes[1]) {
        restaurantTwoName = this.props.restaurantsById[restaurantsRankedByVotes[1][0]].name;
        restaurantTwoScore = restaurantsRankedByVotes[1][1].score;
      }
      if (restaurantsRankedByVotes[2]) {
        restaurantThreeName = this.props.restaurantsById[restaurantsRankedByVotes[2][0]].name;
        restaurantThreeScore = restaurantsRankedByVotes[2][1].score;
      }
      
      return (
        <div id="scoreboard">
          <div className="scoreboard-row">
            <div className="restaurant-name">{restaurantOneName}</div>
            <div className="restaurant-score">{restaurantOneScore}</div>
            <div className="restaurant-name">{restaurantTwoName}</div>
            <div className="restaurant-score">{restaurantTwoScore}</div>
            <div className="restaurant-name">{restaurantThreeName}</div>
            <div className="restaurant-score">{restaurantThreeScore}</div>
          </div>
        </div>
      )
    }
  }
  
  renderRestaurantList() {
    if (this.state.votes) {
      return this.state.votes.recommendedRestaurants.map((restaurant) => {
        return (
          <VotingOption 
            restaurant={restaurant}
            onVote={this.onVote.bind(this)}
          />
        )
      })
    }
  }
  
  // renderTopChoices() {
  //   const numChoicesToShow = 5;
  //   var topChoices = this.props.sortedRestaurants.slice(0,numChoicesToShow);
    
  //   return (
  //     <div id="top-choices">
  //       {
  //         topChoices.map((restaurantChoice) => {
  //           var scoreToDisplay = "Loading...";
            
  //           if (this.state.votes) {
  //             var votesForRestaurant = this.state.votes[restaurantChoice._id];
              
  //             scoreToDisplay = votesForRestaurant ? String(votesForRestaurant.score) : "0";
  //           }
          
  //           return (
  //             <div className="restaurant-choice">
  //               {restaurantChoice.name}
  //               <button onClick={() => this.onVote(restaurantChoice._id, "yes")}>Up</button>
  //               <button onClick={() => this.onVote(restaurantChoice._id, "no")}>Down</button>
  //               <span>
  //                 {scoreToDisplay}
  //               </span>
  //             </div>
  //           )
  //         })
  //       }
  //     </div>  
  //   )
  // }
  
  render() {
    return (
      <div id="voting-room-page" className="page-content">
        {this.renderScoreboard()}
        {this.renderRestaurantList()}
      </div>
    )
  }
  
  onVote(restaurantId, vote) {
    var voteSubmission = {
      restaurantId: restaurantId,
      vote: vote,
      session_id: this.props.match.params.session_id
    }
    this.socket.emit("vote", voteSubmission);
  }
  
  votedRestaurantsSort(a, b) {
    if (a[1].score > b[1].score) {
      return -1;
    } else if (a[1].score < b[1].score) {
      return 1;
    } else {
      return 0;
    }
  }
}

const mapStateToProps = state => {
  return {
    restaurantsById: state.entities.restaurants.byId
  }
}

export default connect(
  mapStateToProps,
  null
)(VotingRoom);
