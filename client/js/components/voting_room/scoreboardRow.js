import React from 'react';

export class ScoreboardRow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderRestaurantNos(nos) {
    if (nos.length > 0) {
      return [
        <i className='fas fa-times'></i>,
        <span className="restaurant-nos">{nos.length}</span>
      ]
    }
  }
  
  renderRank() {
    var rankClass;
    
    switch (this.props.rank) {
      case 1:
        rankClass = "gold top-result"
        break;
      case 2:
        rankClass = "silver top-result"
        break;
      case 3:
        rankClass = "bronze top-result"
        break;
      default:
        rankClass = "";
    }
    
    return (
      <div className={`restaurant-rank ${rankClass}`}>{this.props.rank}</div>  
    )
  }
  
  render() {
    const restaurant = this.props.restaurant
    
    if (restaurant && restaurant.yes.length > 0) {
      return (
        <div className="scoreboard-row section">
          {this.renderRank()}
          <span className="restaurant-name">{restaurant.name}</span>
          <div className="restaurant-score-section">
            <i className='fas fa-thumbs-up'></i>
            <span className="restaurant-score">{restaurant.yes.length}</span>
            {this.renderRestaurantNos(restaurant.no)}
          </div>
        </div>
      )
    } else {
      return <div className="scoreboard-row empty section">{this.props.rank}</div>
    }
  }
}
