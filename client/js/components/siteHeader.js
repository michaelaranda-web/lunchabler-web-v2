import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';

export default class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
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
               <MenuItem id="profile-menu-item">
                  <Link to="/profile">
                    <li>
                      <i className="fas fa-user"></i>
                      <div className="user-name">{this.props.userName || "User"}</div>
                    </li>
                  </Link>
                </MenuItem>
                <hr />
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
              </Dropdown.Menu>
            </Dropdown>
          </ButtonToolbar>
        </div>
      </div>
    )
  }
}