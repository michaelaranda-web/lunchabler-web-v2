import { REQUEST_USERS, RECEIVE_USERS, ADD_USER } from '../constants/constants';
import fetch from 'cross-fetch';
import axios from 'axios';

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

function addUserEntry(user) {
  return {
    type: ADD_USER,
    userId: user.id,
    user: user
  }
}

export function fetchUsers() {
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

export function updateUserAndRefetchUsers(updateData) {
  return function(dispatch) {
    axios.patch('/api/users', updateData)
    .then(function (response) {
      dispatch(fetchUsers())
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
}

export function addUserAndRefetchUsers(userName) {
  return function(dispatch) {
    axios.post('/api/users',{
      name: userName
    })
    .then(function (response) {
      dispatch(fetchUsers())
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
}