import React from 'react';
import { connect } from 'react-redux';
import { addUserAndRefetchUsers } from '../../actions/usersActions';

export class AddUser extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      nameInput: '',
      showMessage: ''
    }
  }
  
  renderMessage() {
    if (this.state.showMessage === 'error') {
      return <p className="error-message">User cannot be blank.</p>
    } else if (this.state.showMessage === 'success') {
      return <p className="success-message">{`${this.state.nameInput} successfully added!`}</p>
    }
  }
  
  render() {
    return (
      <div id="add-users" className="section">
        <div id="add-user-field-container">
          <input 
            id="add-user-field"
            value={this.state.nameInput} 
            onChange={(e) => this.onNameInputChange(e)}
          />
          <button id="add-user-button" onClick={() => this.addUser()}>Add User</button>
        </div>
        {this.renderMessage()}
      </div>
    );
  }
  
  onNameInputChange(e) {
    this.setState({
      nameInput: e.target.value,
      showMessage: ''
    })
  }
  
  addUser() {
    var self = this;
    
    if (this.validateNameInput(this.state.nameInput)) {
      this.props.addUserAndRefetchUsers(this.state.nameInput)
        .then(() => {
          self.setState({showMessage: 'success'})
        });  
    } else {
      this.setState({
        showMessage: 'error'
      })
    }
  }
  
  validateNameInput() {
    return this.state.nameInput != "";
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUserAndRefetchUsers: (user) => { return dispatch(addUserAndRefetchUsers(user)) }
  }
}

export default AddUser = connect(
  null,
  mapDispatchToProps
)(AddUser);