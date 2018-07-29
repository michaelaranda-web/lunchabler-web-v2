import React from 'react';
import { connect } from 'react-redux';
import { Routes } from './routes';
import { fetchUsers } from '../actions/usersActions';

export class App extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
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
    fetchUsers: () => { dispatch(fetchUsers()) }
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);