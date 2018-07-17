import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Home = () => (
  <div>
    Home
  </div>
)

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

const ManageUsers = () => (
  <div>
    Manage Users
  </div>
)

export class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/restaurants/:restaurant_id" component={RestaurantInfo}/>
          <Route path="/restaurants" component={Restaurants}/>
          <Route path="/manage_restaurants" component={ManageRestaurants}/>
          <Route path="/manage_users" component={ManageUsers}/>
        </Switch>
      </Router>
    )
  }
}