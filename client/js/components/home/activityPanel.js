import React from 'react';

export class ActivityPanel extends React.Component {
  renderContent() {
    if (this.props.fetching) {
      return "Loading..."
    } else {
      return this.props.content
    } 
  }
  
  render() {
    return (
      <div id={this.props.id} className={`activity-panel ${this.props.className}`}>
        <h4>{this.props.header}</h4>
        {this.renderContent()}
      </div>
    )
  }
}