import React from 'react';
import { Link } from 'react-router-dom';

export class RestaurantListItem extends React.Component {
  render() {
    return (
      <Link to={`/restaurants/${this.props.restaurant._id}`}>
        <div className="restaurant-list-item">
          <div>
            {this.props.restaurant.name}
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>
      </Link>
    )
  }
}