import React from 'react';
import { connect } from 'react-redux';
import { addRestaurant, fetchRestaurants } from '../../actions/restaurantsActions';
import { YelpRestaurantParser } from '../../helpers/yelpHelper';

export class YelpSearchResultItem extends React.Component {
  render() {
    const yelpRestaurant = new YelpRestaurantParser(this.props.restaurant);
    
    return (
      <div className="yelp-search-result-item">
        <div className="image-container">
          <img src={yelpRestaurant.imageUrl()} />
        </div>
        <div className="details">
          <h4>{yelpRestaurant.name()}</h4>
          <p>{yelpRestaurant.displayAddress1()}</p>
          <p>{yelpRestaurant.displayAddress2()}</p>
          <p>{yelpRestaurant.distance()} miles</p>
        </div>
        <div className="actions">
          <a className="action-link" href={yelpRestaurant.url()} target="_blank">YELP PAGE</a>
          <a className="action-link" onClick={ () => this.onImportClick(yelpRestaurant) }>IMPORT</a>
        </div>
      </div>
    );
  }
  
  //TODO: Don't forget to refetch restaurants afterwards.
  onImportClick(yelpRestaurant) {
    addRestaurant({
      name: yelpRestaurant.name(),
      imageUrl: yelpRestaurant.imageUrl(),
      displayAddress1: yelpRestaurant.displayAddress1(),
      displayAddress2: yelpRestaurant.displayAddress2(),
      distance: yelpRestaurant.distance(),
      url: yelpRestaurant.url()
    })
    .then(() => {
      this.props.fetchRestaurants();  
    });
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants: () => { return dispatch(fetchRestaurants()) }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(YelpSearchResultItem);