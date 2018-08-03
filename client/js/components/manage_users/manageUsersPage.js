import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../actions/usersActions';

export class ManageUsersPage extends React.Component {
  render() {
    return (
      <div id="manage-users-page">
        {
          Object.keys(this.props.usersById).map((userId) => {
            return <p>{this.props.usersById[userId].name}</p>
          })
        }
        <a onClick={() => this.addUser()}>Add User</a>
      </div>
    );
  }
  
  addUser() {
    let user = {
      name: "Test User",
      id: "test123"
    }
    
    this.props.addUser(user);
  }
}

const mapStateToProps = state => {
  return {
    usersById: state.entities.users.byId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (user) => { dispatch(addUser(user)) }
  }
}

export default ManageUsersPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUsersPage);