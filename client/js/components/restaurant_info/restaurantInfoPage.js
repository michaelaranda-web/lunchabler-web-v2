import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GeneralInfo } from './tabs/generalInfo';
import UserPreferences from './tabs/userPreferences';
import Comments from './tabs/comments';

export class RestaurantInfoPage extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      openTab: 1
    }
  }
  
  renderTabs() {
    return (
      <div id="tabs">
        <div className={`tab ${this.activeTabClass(1)}`} onClick={ () => this.switchTab(1) }>
          <i class="fas fa-align-left"></i>
        </div>
        <div className={`tab ${this.activeTabClass(2)}`} onClick={ () => this.switchTab(2) }>
          <i class="far fa-grin-beam"></i>
        </div>
        <div className={`tab ${this.activeTabClass(3)}`} onClick={ () => this.switchTab(3) }>
          <i class="far fa-comment-dots"></i>
        </div>
      </div>
    )
  }
  
  renderOpenTab(restaurant) {
    switch(this.state.openTab) {
      case 1:
        return <GeneralInfo restaurant={restaurant} />
        break;
      case 2:
        return <UserPreferences restaurant={restaurant} />
        break;
      case 3:
        return <Comments restaurant={restaurant} />
        break;
      default:
        return <GeneralInfo restaurant={restaurant} />
    }
  }
  
  render() {
    var restaurant = this.props.restaurantsById[this.props.match.params.restaurant_id];
    
    if (!!restaurant) {
      return (
        <div id="restaurant-info-page" className="page-content">
          {this.renderTabs()}
          {this.renderOpenTab(restaurant)}
          <Link to="/results">Back to results</Link>
        </div>
      )
    } else { return null; }
  }
  
  activeTabClass(tab) {
    return this.state.openTab === tab ? 'open' : '';
  }
  
  switchTab(tab) {
    this.setState({openTab: tab})
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
)(RestaurantInfoPage);