import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

export class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      redirect: false, 
      nameInput: '',
      emailInput: '',
      passwordInput: ''
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
                onChange={(e) => {this.setState({nameInput: e.target.value})}}
              />
            </label>
          </div>
          <div className="field">
            <label>
              Email:
              <input 
                value={this.state.emailInput} 
                onChange={(e) => {this.setState({emailInput: e.target.value})}}
              />
            </label>
          </div>
          <div className="field">
            <label>
              Password:
              <input 
                value={this.state.passwordInput} 
                onChange={(e) => {this.setState({passwordInput: e.target.value})}}
              />
            </label>
          </div>
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
    //TODO: Refactor into Redux action
    axios.post('/api/signup', {
      name: this.state.nameInput,
      email: this.state.emailInput,
      password: this.state.passwordInput
    })
      .then(() => {
        this.setState({redirect: true})
      })
  }
}
