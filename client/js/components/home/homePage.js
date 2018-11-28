import React from 'react';
import { connect } from 'react-redux';
import { ActivityPanel } from './activityPanel';
import moment from 'moment';

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
        <div id="recent-visits" className="section">
          <h4>Recent Visits</h4>
          {this.renderRecentVisits()}
        </div>
      </div>
    )
  }
  
  renderRecentVisits() {
    if (!this.props.fetchingRestaurants && !this.props.fetchingVisits) {
      return this.props.visits.map((visit) => {
        var restaurant = this.props.restaurantsById[visit.restaurant];
        var visitDate = moment(visit.date).format("MMMM Do, YYYY")
        
        return (
          <div className="visit-row">
            <div className="visit-restaurant">{restaurant.name}</div>
            <div className="visit-date">{visitDate}</div>
          </div>
        )
      })
    }
  }
  
  renderLastVisitPanel() {
    var content = "No visits have been recorded yet";
    
    if (this.props.visits.length > 0 && Object.keys(this.props.restaurantsById).length > 0) {
      var lastVisit = this.props.visits[0];
      var restaurantName = this.props.restaurantsById[lastVisit.restaurant].name;
      var visitDate = moment(lastVisit.date).format("MMMM Do, YYYY")
      content = `${restaurantName} - ${visitDate}`;
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