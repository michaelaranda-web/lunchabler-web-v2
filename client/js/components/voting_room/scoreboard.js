import React from 'react';
import { restaurantsRankedByVotes } from '../../helpers/votingRoomHelper';

export class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.numRankingsToDisplay = 3;
  }
  
  renderEmptyScoreboardRow() {
    return (
      <div className="scoreboard-row">
        <span>-</span>
        <span>-</span>
      </div>  
    )
  }
  
  renderRankings(rankedRestaurants) {
    var rankings = [];
    
    for (let i = 0; i < this.numRankingsToDisplay; i++) {
      if (rankedRestaurants[i] && rankedRestaurants[i].yesVotes.length > 0) {
        var restaurantName = rankedRestaurants[i].name;
        var restaurantScore = rankedRestaurants[i].yesVotes.length;
        rankings.push(
          <div className="scoreboard-row">
            <span className="restaurant-name">{restaurantName}</span>
            <span className="restaurant-score">{restaurantScore}</span>
          </div>
        )
      } else {
        rankings.push(this.renderEmptyScoreboardRow());
      }
    }
    
    return rankings;
  }
  
  render() {
    if (this.props.restaurants) {
      var topRankedRestaurants = restaurantsRankedByVotes(this.props.restaurants).slice(0, this.numRankingsToDisplay);
      
      return (
        <div id="scoreboard">
          {this.renderRankings(topRankedRestaurants)}
        </div>
      )
    } else {
      return (
        <div id="scoreboard">
          {this.renderEmptyScoreboardRow()}
          {this.renderEmptyScoreboardRow()}
          {this.renderEmptyScoreboardRow()}
        </div>
      )
    }
  }
}