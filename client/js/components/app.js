import React from 'react';
import { connect } from 'react-redux';
import { Routes } from './routes';
import { fetchUsers } from '../actions/usersActions';
import { fetchRestaurants } from '../actions/restaurantsActions';

export class App extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchRestaurants();
  }
  
  render() {
    return (
      <div id="app">
        <Routes />
      </div>
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
    fetchUsers: () => { dispatch(fetchUsers()) },
    fetchRestaurants: () => { dispatch(fetchRestaurants()) }
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);