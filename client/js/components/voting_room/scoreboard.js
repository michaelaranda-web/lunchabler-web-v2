import React from 'react';
import { connect } from 'react-redux';
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
  
  renderRankings(restaurants) {
    var rankings = [];
    
    for (let i = 0; i < this.numRankingsToDisplay; i++) {
      if (restaurants[i]) {
        var restaurantName = this.props.restaurantsById[restaurants[i].id].name;
        var restaurantScore = restaurants[i].score;
        rankings.push(
          <div className="scoreboard-row">
            <span>{restaurantName}</span>
            <span>{restaurantScore}</span>
          </div>
        )
      } else {
        rankings.push(this.renderEmptyScoreboardRow());
      }
    }
    
    return rankings;
  }
  
  render() {
    if (this.props.votedRestaurants && this.props.restaurantsById) {
      var topRankedRestaurants = restaurantsRankedByVotes(this.props.votedRestaurants).slice(0, this.numRankingsToDisplay);
      
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

const mapStateToProps = state => {
  return {
    restaurantsById: state.entities.restaurants.byId
  }
}

export default connect(
  mapStateToProps,
  null
)(Scoreboard);