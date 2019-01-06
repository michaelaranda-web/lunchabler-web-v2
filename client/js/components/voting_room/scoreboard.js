import React from 'react';
import { ScoreboardRow } from './scoreboardRow';
import { getCurrentRestaurantVotes } from '../../helpers/votingRoomHelper';

export class Scoreboard extends React.Component {
  renderRankings(rankedRestaurants) {
    var rankings = [];
    
    for (let i = 0; i < 5; i++) {
      var currRestaurant = rankedRestaurants[i];
      rankings.push(<ScoreboardRow rank={i+1} restaurant={currRestaurant} />);
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
          <ScoreboardRow rank={1} restaurant={null} />
          <ScoreboardRow rank={2} restaurant={null} />
          <ScoreboardRow rank={3} restaurant={null} />
          <ScoreboardRow rank={4} restaurant={null} />
          <ScoreboardRow rank={5} restaurant={null} />
        </div>
      )
    }
  }
}