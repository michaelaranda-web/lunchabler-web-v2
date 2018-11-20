import React from 'react';

export class HomePage extends React.Component {
  render() {
    return (
      <div id="home-page" className="page-content">
        <div id="home-page-icon"></div>
        <span>Instant Ink</span>
        <div id="activity-panels">
          <div id="notification-panel" className="activity-panel section">
            <h4>SUGGESTION</h4>
            Farmer's Market is today.
          </div>
          <div id="last-visit-panel" className="activity-panel section">
            <h4>LAST VISIT</h4>
            Jimbo's on Tuesday, Jan 23
          </div>
          <div id="recent-activity-panel" className="activity-panel section">
            <h4>RECENT ACTIVITY</h4>
            Derek said 'Meh' to Wahoo's Fish Tacos
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage;