import React from 'react';
import { connect } from 'react-redux';
import { ActivityPanel } from './activityPanel';

export class HomePage extends React.Component {
  render() {
    return (
      <div id="home-page" className="page-content">
        <div id="header-row">
          <div id="home-page-icon">
            <i className="fas fa-home" />
          </div>
          <span id="group-name">Instant Ink</span>
        </div>
        <div id="activity-panels">
          <div id="notification-panel" className="activity-panel section">
            <h4>SUGGESTION</h4>
            Farmer's Market is today.
          </div>
          {this.renderLastVisitPanel()}
          <div id="recent-activity-panel" className="activity-panel section">
            <h4>RECENT ACTIVITY</h4>
            Derek said 'Meh' to Wahoo's Fish Tacos
          </div>
        </div>
      </div>
    )
  }
  
  renderLastVisitPanel() {
    var content = "No visits have been recorded yet";
    
    if (this.props.visits.length > 0 && Object.keys(this.props.restaurantsById).length > 0) {
      var restaurantName = this.props.restaurantsById[this.props.visits[0].restaurant].name;
      content = `${restaurantName} was recently visited`;
    }
    
    return (
      <ActivityPanel
        id="last-visit-panel" 
        className="section"
        fetching={this.props.fetchingRestaurants && this.props.fetchingVisits}
        header={"LAST VISIT"}
        content={content}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    restaurantsById: state.entities.restaurants.byId,
    visits: state.entities.visits.all,
    fetchingRestaurants: state.entities.restaurants.isFetching,
    fetchingVisits: state.entities.visits.isFetching
  }
};

export default connect(
  mapStateToProps,
  null
)(HomePage); 