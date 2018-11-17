import React from 'react';
import UserList from './userList';
import AddUser from './addUser';

export class ManageUsersPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showContent: 'user-list'
    }
  }
  
  renderContent() {
    if (this.state.showContent === 'user-list') {
      return <UserList />
    } else {
      return <AddUser />
    }
  }
  
  render() {
    return (
      <div id="manage-users-page" className="page-content">
        <h1>Users</h1>
        <div className="tabs">
          <div className={`tab ${this.activeTabClass('user-list')}`} onClick={ () => this.toggleContent('user-list') }>
            <i className="fas fa-users"></i>
          </div>
          <div className={`tab ${this.activeTabClass('add-user')}`} onClick={ () => this.toggleContent('add-user') }>
            <i className="fas fa-user-plus"></i>
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
