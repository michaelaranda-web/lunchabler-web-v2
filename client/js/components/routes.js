import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './home/homePage';
import ManageUsersPage from './manage_users/manageUsersPage';

const Restaurants = () => (
  <div>
    Restaurants
  </div>
)

const RestaurantInfo = ({match}) => (
  <div>
    Restaurant Info {match.params.restaurant_id}
  </div>
)

const ManageRestaurants = () => (
  <div>
    Manage Restaurants
  </div>
)

export class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/restaurants/:restaurant_id" component={RestaurantInfo}/>
          <Route path="/restaurants" component={Restaurants}/>
          <Route path="/manage_restaurants" component={ManageRestaurants}/>
          <Route path="/manage_users" component={ManageUsersPage}/>
        </Switch>
      </Router>
    )
  }
}