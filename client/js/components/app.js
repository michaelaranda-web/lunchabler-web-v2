import React from 'react';
import { connect } from 'react-redux';
import { Routes } from './routes';
import { fetchUsers } from '../actions/usersActions';
import { fetchRestaurants } from '../actions/restaurantsActions';

export class App extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    //TODO: Get user ids from front-end
    this.props.fetchRestaurants(["5b6a758cf3a1030b5ae124bc", 
    "5b6a758cf3a1030b5ae124bd", 
    "5b6a758cf3a1030b5ae124be", 
    "5b6a758cf3a1030b5ae124bf", 
    "5b6a758cf3a1030b5ae124c0", 
    "5b6a758cf3a1030b5ae124c1", 
    "5b6a758cf3a1030b5ae124c2", 
    "5b6a758cf3a1030b5ae124c3",
    "5b6a758cf3a1030b5ae124c4"]);
  }
  
  render() {
    return (
      <div id="main">
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
    fetchRestaurants: (lunchGroupIds) => { dispatch(fetchRestaurants(lunchGroupIds)) }
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);