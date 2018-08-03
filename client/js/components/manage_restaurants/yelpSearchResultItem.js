import React from 'react';
import { YelpRestaurantParser } from '../../helpers/yelpHelper';

export class YelpSearchResultItem extends React.Component {
  render() {
    const restaurant = new YelpRestaurantParser(this.props.restaurant);
    
    return (
      <div class="yelp-search-result-item">
        <img src={restaurant.imageUrl()} />
        <h4>{restaurant.name()}</h4>
        <p>{restaurant.displayAddress1()}</p>
        <p>{restaurant.displayAddress2()}</p>
        <p>{restaurant.distance()} miles</p>
        <a href={restaurant.url()} target="_blank">Yelp Page</a>
        <button onClick={ () => this.onImport(restaurant.id()) }>Import</button>
      </div>
    );
  }
  
  onImport(restaurantId) {
    console.log("import restaurant" + restaurantId);
  }
}