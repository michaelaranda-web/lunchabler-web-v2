import React from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserPreferences from './userPreferences';

export class UserListItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showContent: ''
    }
  }
  
  renderUserSettings() {
    if (this.state.showContent === 'settings') {
      return <div>settings</div>
    }
  }
  
  renderUserPreferences() {
    if (this.state.showContent === 'preferences') {
      return <UserPreferences user={this.props.user} />
    }
  }
  
  render() {
    return (
      <Panel eventKey={this.props.itemKey} className="user-list-item">
        <Panel.Heading className="user-list-item-header">
          <Panel.Title toggle>
            <span className="user-name">{this.props.user.name}</span>
            <i class="fas fa-chevron-down"></i>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <div>
            <a className="user-list-item-link" onClick={() => this.setState({showContent: 'settings'})}>Settings</a>
            <a className="user-list-item-link" onClick={() => this.setState({showContent: 'preferences'})}>Manage Preferences</a>
            
            {this.renderUserSettings()}
            {this.renderUserPreferences()}
          </div>
        </Panel.Body>
      </Panel>
    );  
  }
}