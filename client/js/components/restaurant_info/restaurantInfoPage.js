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
      openTab: 'general-info'
    }
  }
  
  renderTabs() {
    return (
      <div id="tabs">
        <div className="tab" onClick={ () => this.switchTab('general-info') }>
          <i class="fas fa-align-left"></i>
        </div>
        <div className="tab" onClick={ () => this.switchTab('preferences') }>
          <i class="far fa-grin-beam"></i>
        </div>
        <div className="tab" onClick={ () => this.switchTab('comments') }>
          <i class="far fa-comment-dots"></i>
        </div>
      </div>
    )
  }
  
  renderOpenTab(restaurant) {
    switch(this.state.openTab) {
      case 'preferences':
        return <UserPreferences restaurant={restaurant} />
        break;
      case 'comments':
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