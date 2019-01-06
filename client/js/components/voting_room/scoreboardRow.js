import React from 'react';

export class ScoreboardRow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderRestaurantNos(nos) {
    if (nos.length > 0) {
      return [
        <i className='fas fa-thumbs-down'></i>,
        <span className="restaurant-nos">{nos.length}</span>
      ]
    }
  }
  
  render() {
    const restaurant = this.props.restaurant
    
    if (restaurant && restaurant.yes.length > 0) {
      return (
        <div className="scoreboard-row section">
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
