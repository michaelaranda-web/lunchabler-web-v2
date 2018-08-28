import React from 'react';
import { addRestaurant } from '../../actions/restaurantsActions';
import { YelpRestaurantParser } from '../../helpers/yelpHelper';

export class YelpSearchResultItem extends React.Component {
  render() {
    const yelpRestaurant = new YelpRestaurantParser(this.props.restaurant);
    
    return (
      <div className="yelp-search-result-item">
        <img src={yelpRestaurant.imageUrl()} />
        <h4>{yelpRestaurant.name()}</h4>
        <p>{yelpRestaurant.displayAddress1()}</p>
        <p>{yelpRestaurant.displayAddress2()}</p>
        <p>{yelpRestaurant.distance()} miles</p>
        <a href={yelpRestaurant.url()} target="_blank">Yelp Page</a>
        <button onClick={ () => this.onImportClick(yelpRestaurant) }>Import</button>
      </div>
    );
  }
  
  onImportClick(yelpRestaurant) {
    addRestaurant({
      name: yelpRestaurant.name(),
      displayAddress1: yelpRestaurant.displayAddress1(),
      displayAddress2: yelpRestaurant.displayAddress2(),
      distance: yelpRestaurant.distance(),
      url: yelpRestaurant.url()
    });
  }
}