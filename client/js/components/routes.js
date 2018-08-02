import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './home/homePage';
import ManageUsersPage from './manage_users/manageUsersPage';
import ManageRestaurantsPage from './manage_restaurants/manageRestaurantsPage';

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

export class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/restaurants/:restaurant_id" component={RestaurantInfo}/>
          <Route path="/restaurants" component={Restaurants}/>
          <Route path="/manage_restaurants" component={ManageRestaurantsPage}/>
          <Route path="/manage_users" component={ManageUsersPage}/>
        </Switch>
      </Router>
    )
  }
}