import { VERIFY_AUTHENTICATED, VERIFY_AUTHENTICATED_SUCCESS, VERIFY_AUTHENTICATED_ERROR,
          REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_ERROR } from '../constants/constants';
import axios from 'axios';
import fetch from 'cross-fetch';

function verifyAuthenticatedAction() {
  return {
    type: VERIFY_AUTHENTICATED
  }
}

function verifyAuthenticatedSuccessAction(loggedIn) {
  return {
    type: VERIFY_AUTHENTICATED_SUCCESS,
    loggedIn: loggedIn
  }  
}

function verifyAuthenticatedErrorAction() {
  return {
    type: VERIFY_AUTHENTICATED_ERROR
  }
}

function loginAction() {
  return {
    type: REQUEST_LOGIN
  }
}

function loginSuccessAction(userData) {
  return {
    type: REQUEST_LOGIN_SUCCESS,
    user: userData
  }
}

function loginErrorAction() {
  return {
    type: REQUEST_LOGIN_ERROR
  }
}

export function login(email, password) {
  return function (dispatch, getState) {
    dispatch(loginAction());
  
    return axios.post('/api/login', {
      email: email,
      password: password
    })
      .then((response) => {
        dispatch(loginSuccessAction(response.data));
      })
      .catch((error) => {
        dispatch(loginErrorAction());
        console.log('An error occurred.', error);
      })
  }
}

export function logout() {
  return fetch('/api/logout');
}

export function verifyAuthenticated() {
  return function (dispatch, getState) {
    dispatch(verifyAuthenticatedAction());

    return fetch('/api/is_authenticated')
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(verifyAuthenticatedSuccessAction(response.loggedIn));
      })
      .catch(error => {
        dispatch(verifyAuthenticatedErrorAction());
        console.log('An error occurred.', error);
      });
  }
}