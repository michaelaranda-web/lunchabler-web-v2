import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';

export class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderProfileMenuItem() {
    if (this.props.loggedIn) {
      return (
        <MenuItem id="profile-menu-item">
          <Link to="/profile">
            <li>
              <i className="fas fa-user"></i>
              <div className="user-name">{this.props.userName || "Profile"}</div>
            </li>
          </Link>
        </MenuItem>
      )  
    }
  }
  
  renderLogoutMenuItem() {
    if (this.props.loggedIn) {
      return (
        <MenuItem>
          <li onClick={logout}>Log out</li>
        </MenuItem>
      )  
    }
  }
  
  renderSignUpLink() {
    if (!this.props.loggedIn) {
      return (
        <MenuItem>
          <Link to="/login">
            <li>Log In</li>
          </Link>
        </MenuItem>
      )
    }
  }
  
  renderLogInLink() {
    if (!this.props.loggedIn) {
      return (
        <MenuItem>
          <Link to="/signup">
            <li>Sign Up</li>
          </Link>
        </MenuItem>
      )
    }
  }
  
  renderDivider() {
    if (this.props.loggedIn) {
      return <hr />  
    }
  }
  
  render() {
    return (
      <div id="site-header">
        <div className="header-content-left">
          <Link to="/">
            <span id="site-name">Lunchabler</span>
          </Link>
        </div>
        <div className="header-content-right">
          <ButtonToolbar pullRight={true} >
            <Dropdown id="mobile-nav-menu-icon" pullRight={true}>
              <Dropdown.Toggle pullRight={true} noCaret>
                <i class="fas fa-bars"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu pullRight={true}>
                {this.renderProfileMenuItem()}
                {this.renderDivider()}
                {this.renderLogInLink()}
                {this.renderSignUpLink()}
                <MenuItem>
                  <Link to="/">
                    <li>Home</li>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/start">
                    <li>Lunch Time</li>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/manage_restaurants">
                    <li>Restaurants</li>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/manage_users">
                    <li>Users</li>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/voting_rooms">
                    <li>Voting Rooms</li>
                  </Link>
                </MenuItem>
                {this.renderLogoutMenuItem()}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonToolbar>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userName: state.ui.auth.user.name,
    loggedIn: state.ui.auth.isAuthenticated
  }
}

export default connect(
  mapStateToProps,
  null
)(SiteHeader);