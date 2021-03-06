import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router';
import { fetchUsers } from '../../actions/usersActions';
import { signup } from '../../actions/authActions';

export class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      redirect: false, 
      nameInput: '',
      emailInput: '',
      passwordInput: '',
      errorMessage: null,
    }
  }
  
  renderErrorMessage() {
    if (!!this.state.errorMessage) {
      return (
        <div className="error">{this.state.errorMessage}</div>  
      )
    }
  }
  
  render() {
    if (this.state.redirect) return <Redirect to='/' />;
    
    return (
      <div id="signup-page" className="page-content">
        <h1>Sign Up</h1>
        <div className="section">
          <div className="field">
            <label>
              Name:
              <input 
                value={this.state.nameInput} 
                onChange={(e) => {this.setState({errorMessage: null, nameInput: e.target.value})}}
              />
            </label>
          </div>
          <div className="field">
            <label>
              Email:
              <input 
                type="email"
                value={this.state.emailInput} 
                onChange={(e) => {this.setState({errorMessage: null, emailInput: e.target.value})}}
              />
            </label>
          </div>
          <div className="field">
            <label>
              Password:
              <input 
                type="password"
                value={this.state.passwordInput} 
                onChange={(e) => {this.setState({passwordInput: e.target.value})}}
              />
            </label>
          </div>
          {this.renderErrorMessage()}
        </div>
        <div className="button-row">
          <a 
            className="submit-button"
            onClick={() => this.submitCreateAccount()}>
            Create Account
          </a>
      </div>
      </div>
    );
  }
  
  submitCreateAccount() {
    this.props.signup(
      this.state.nameInput,
      this.state.emailInput,
      this.state.passwordInput
    )
      .then(() => {
        this.props.fetchUsers();
      })
      .then(() => {
        this.setState({redirect: true})
      })
      .catch((error) => {
        var errorMessage = "";
        switch (error.response.data.errorCode) {
          case "already_exists":
            errorMessage = "Account already exists. Please sign in."
            break;
          default:
            errorMessage = "Something went wrong. Please try again."
        }
        this.setState({
          passwordInput: '',
          errorMessage: errorMessage
        })
      })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => { return dispatch(fetchUsers()) },
    signup: (name, user, password) => { return dispatch(signup(name, user, password)) }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignupPage);
