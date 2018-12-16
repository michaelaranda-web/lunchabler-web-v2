import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import { login } from '../../actions/authActions';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      redirect: false, 
      emailInput: '',
      passwordInput: ''
    }
  }
  
  render() {
    if (this.state.redirect) return <Redirect to='/' />;
    
    return (
      <div id="signup-page" className="page-content">
        <h1>Log In</h1>
        <div className="section">
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
          <div className="create-account-link-container">
            <span>Don't have an account? </span><Link to="/signup">Click here to create one.</Link>
          </div>
        </div>
        <div className="button-row">
          <a 
            className="submit-button"
            onClick={() => this.submitLogin()}>
            Log In
          </a>
      </div>
      </div>
    );
  }
  
  submitLogin() {
    this.props.login(this.state.emailInput, this.state.passwordInput)
      .then(() => {
        this.setState({redirect: true})
      });
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user, password) => { return dispatch(login(user, password)) }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);

