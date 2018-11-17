import React from 'react';
import { connect } from 'react-redux';
import { updateUserAndRefetchUsers } from '../../actions/usersActions';

export class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      nameInput: ''
    }
  }
  
  render() {
    return (
      <div className="user-settings">
        <div className="field">
          <label>
            Name:
            <input 
              placeholder={this.props.userName}
              value={this.state.nameInput}
              onChange={(e) => this.onNameInputChange(e.target.value)}>
            </input>
          </label>
        </div>
        <div className="button-row">
          <a 
            className="submit-button"
            onClick={() => this.submitChanges()}>
            Update
          </a>
        </div>
      </div>
    );  
  }
  
  submitChanges() {
    this.props.updateUserAndRefetchUsers({
      previousName: this.props.userName,
      name: this.state.nameInput
    });
  }
  
  onNameInputChange(value) {
    this.setState({
      nameInput: value
    })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserAndRefetchUsers: (userData) => { dispatch(updateUserAndRefetchUsers(userData)) }
  }
}

export default UserSettings = connect(
  null,
  mapDispatchToProps
)(UserSettings);