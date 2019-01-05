import React from 'react';
import { getCurrentRestaurantVotes } from '../../helpers/votingRoomHelper';

export class Scoreboard extends React.Component {
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
    
    for (let i = 0; i < 5; i++) {
      if (rankedRestaurants[i] && rankedRestaurants[i].yes.length > 0) {
        var restaurantName = rankedRestaurants[i].name;
        var restaurantScore = rankedRestaurants[i].yes.length;
         rankings.push(
           <div className="scoreboard-row">
            <span className="restaurant-name">{restaurantName}</span>
            <span className="restaurant-score">{restaurantScore}</span>
            <span className="restaurant-nos">
              {
                rankedRestaurants[i].no.length > 0
                  ? "Number of no's: " + rankedRestaurants[i].no.length
                  : null
              }
            </span>
          </div>
        )
      } else {
        rankings.push(this.renderEmptyScoreboardRow());
      }
    }
    
    return rankings;
  }
  
  render() {
    if (this.props.lunchGroupVotes && this.props.restaurants) {
      var topRankedRestaurants = getCurrentRestaurantVotes(this.props.lunchGroupVotes, this.props.restaurants)
      
      return (
        <div id="scoreboard">
          {this.renderRankings(topRankedRestaurants)}
        </div>
      )
    } else {
      return (
        <div id="scoreboard">
          {this.renderEmptyScoreboardRow()}
-         {this.renderEmptyScoreboardRow()}
-         {this.renderEmptyScoreboardRow()}
-         {this.renderEmptyScoreboardRow()}
-         {this.renderEmptyScoreboardRow()}
        </div>
      )
    }
  }
}