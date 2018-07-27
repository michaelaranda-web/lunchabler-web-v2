import { REQUEST_USERS, RECEIVE_USERS } from '../constants/constants';
import fetch from 'cross-fetch';

function requestUsers() {
  return {
    type: REQUEST_USERS
  }
}

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users: users
  }
}

export function fetchUsers() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    dispatch(requestUsers())

    return fetch('/api/users')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveUsers(json))
      )
  }
}