import React from 'react';
import { connect } from 'react-redux';
import { addUserAndRefetchUsers } from '../../actions/usersActions';

export class ManageUsersPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      nameInput: ''
    }
  }
  
  renderErrorMessage() {
    if (this.state.showErrorMessage) {
      return <p className="error-message">User cannot be blank.</p>
    }
  }
  
  render() {
    return (
      <div id="manage-users-page">
        {
          Object.keys(this.props.usersById).map((userId) => {
            return <p>{this.props.usersById[userId].name}</p>
          })
        }
        <input 
          value={this.state.nameInput} 
          onChange={(e) => this.onNameInputChange(e)}
        />
        <button onClick={() => this.addUser()}>Add User</button>
        {this.renderErrorMessage()}
      </div>
    );
  }
  
  onNameInputChange(e) {
    this.setState({
      nameInput: e.target.value,
      showErrorMessage: false
    })
  }
  
  addUser() {
    if (this.validateNameInput(this.state.nameInput)) {
      this.props.addUserAndRefetchUsers(this.state.nameInput);  
    } else {
      this.setState({
        showErrorMessage: true
      })
    }
  }
  
  validateNameInput() {
    return this.state.nameInput != "";
  }
}

const mapStateToProps = state => {
  return {
    usersById: state.entities.users.byId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUserAndRefetchUsers: (user) => { dispatch(addUserAndRefetchUsers(user)) }
  }
}

export default ManageUsersPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUsersPage);