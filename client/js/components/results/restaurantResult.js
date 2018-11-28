import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { SelectRestaurantModal } from './selectRestaurantModal';

export class RestaurantResult extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showSelectRestaurantModal: false
    }
  }
  
  renderDetails(restaurant) {
    var distance = restaurant.distance ? <p>{`${restaurant.distance} miles`}</p> : null;
    
    return (
      <div className="restaurant-details-container">
        <h4>{restaurant.name}</h4>
        {distance}
      </div>
    )
  }
  
  renderImage(restaurant) {
    if (!!restaurant.imageUrl) {
      return <img src={restaurant.imageUrl} />
    } else {
      return <i className="fas fa-utensils" />
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
    var restaurant = this.props.restaurant;
    
    return (
      <div className="restaurant-result-container">
        {this.renderRank()}
        <div className="restaurant-result">
          <Route render={({history}) => (
            <div className="restaurant-info" onClick={() => this.showRestaurantInfo(history)}>
              <div className="image-container">
                {this.renderImage(restaurant)}
              </div>
              {this.renderDetails(restaurant)}
            </div>
          )} />
          <div className="actions-container">
            <div className="select-restaurant" onClick={() => this.showSelectRestaurantModal()}>
              <i className="fas fa-check" />
            </div>
          </div>
          <SelectRestaurantModal
            restaurant={restaurant}
            show={this.state.showSelectRestaurantModal}
            onClose={() => this.onSelectRestaurantModalClose()}
          />
        </div>
      </div>
    )
  }
  
  showRestaurantInfo(history) {
    history.push(`/restaurants/${this.props.restaurant._id}`);
  }
  
  showSelectRestaurantModal() {
    this.setState({
      showSelectRestaurantModal: true
    })
  }
  
  onSelectRestaurantModalClose() {
    this.setState({
      showSelectRestaurantModal: false
    })
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
)(RestaurantResult);