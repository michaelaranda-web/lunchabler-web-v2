import React from 'react';
import { Link } from 'react-router-dom';

export default class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="side-nav-bar">
        <ul id="nav-links">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/start">
            <li>Lunch Time</li>
          </Link>
          <Link to="/manage_restaurants">
            <li>Restaurants</li>
          </Link>
          <Link to="/manage_users">
            <li>Users</li>
          </Link>
        </ul>
      </div>
    )
  }
}