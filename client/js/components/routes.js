import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './home/homePage';
import StartPage from './start/startPage';
import ResultsPage from './results/resultsPage';
import { ManageUsersPage } from './manage_users/manageUsersPage';
import ManageRestaurantsPage from './manage_restaurants/manageRestaurantsPage';
import RestaurantInfoPage from './restaurant_info/restaurantInfoPage';
import SiteHeader from './siteHeader';
import SideNavBar from './sideNavBar';
import ScrollToTop from './scrollToTop';

export class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div id="app-content">
          <SiteHeader />
          <div id="main-content">
            <SideNavBar />
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/restaurants/:restaurant_id" component={RestaurantInfoPage}/>
              <Route path="/results" component={ResultsPage}/>
              <Route path="/start" component={StartPage}/>
              <Route path="/manage_restaurants" component={ManageRestaurantsPage}/>
              <Route path="/manage_users" component={ManageUsersPage}/>
            </Switch>
          </div>
          <ScrollToTop />
        </div>
      </Router>
    )
  }
}