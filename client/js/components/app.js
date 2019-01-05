import React from 'react';
import { connect } from 'react-redux';
import Routes from './routes';
import { verifyAuthenticated } from '../actions/authActions';
import { fetchUsers } from '../actions/usersActions';
import { fetchRestaurants } from '../actions/restaurantsActions';
import { fetchRestaurantVisits } from '../actions/visitsActions';

export class App extends React.Component {
  componentDidMount() {
    this.props.verifyAuthenticated();
    this.props.fetchUsers();
    this.props.fetchRestaurants();
    this.props.fetchRestaurantVisits(null, 10);
  }
  
  render() {
    return (
      <Routes />
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.entities.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyAuthenticated: () => { dispatch(verifyAuthenticated()) },
    fetchUsers: () => { dispatch(fetchUsers()) },
    fetchRestaurants: () => { dispatch(fetchRestaurants()) },
    fetchRestaurantVisits: (restaurantId, numVisits) => { dispatch(fetchRestaurantVisits(restaurantId, numVisits)) }
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);