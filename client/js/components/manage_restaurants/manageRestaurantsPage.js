import React from 'react';
import { AddRestaurant } from './addRestaurant';
import RestaurantList from './restaurantList';

export class ManageRestaurantsPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showContent: 'restaurant-list'
    }
  }
  
  renderContent() {
    if (this.state.showContent === 'restaurant-list') {
      return <RestaurantList />
    } else {
      return <AddRestaurant />
    }
  }
  
  render() {
    return (
      <div id="manage-restaurants-page" className="page-content">
        <h1>Restaurants</h1>
        <div className="tabs">
          <div className={`tab ${this.activeTabClass('restaurant-list')}`} onClick={ () => this.toggleContent('restaurant-list') }>
            <i className="fas fa-list"></i>
          </div>
          <div className={`tab ${this.activeTabClass('add-restaurant')}`} onClick={ () => this.toggleContent('add-restaurant') }>
            <i className="fas fa-plus"></i>
          </div>
        </div>
        {this.renderContent()}
      </div>
    );
  }
  
  toggleContent(contentKey) {
    this.setState({
      showContent: contentKey
    })
  }
  
  activeTabClass(tab) {
    return this.state.showContent === tab ? 'active' : '';
  }
}