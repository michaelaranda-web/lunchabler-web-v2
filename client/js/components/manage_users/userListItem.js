import React from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserSettings from './userSettings';
import UserPreferences from './userPreferences';

export class UserListItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showContent: 'settings'
    }
  }
  
  renderUserSettings() {
    if (this.state.showContent === 'settings') {
      return <UserSettings userName={this.props.user.name} />
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
            <div className="links-row">
              <a className="user-list-item-link" onClick={() => this.setState({showContent: 'settings'})}>SETTINGS</a>
              <a className="user-list-item-link" onClick={() => this.setState({showContent: 'preferences'})}>MANAGE PREFERENCES</a>
            </div>
            
            <div className="user-list-item-body">
              {this.renderUserSettings()}
              {this.renderUserPreferences()}
            </div>
          </div>
        </Panel.Body>
      </Panel>
    );  
  }
}