import { VERIFY_AUTHENTICATED, VERIFY_AUTHENTICATED_SUCCESS, VERIFY_AUTHENTICATED_ERROR,
          REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_ERROR,
          REQUEST_LOGOUT, REQUEST_LOGOUT_SUCCESS, REQUEST_LOGOUT_ERROR } from '../constants/constants';
import axios from 'axios';
import fetch from 'cross-fetch';

function verifyAuthenticatedAction() {
  return {
    type: VERIFY_AUTHENTICATED
  }
}

function verifyAuthenticatedSuccessAction(userData) {
  return {
    type: VERIFY_AUTHENTICATED_SUCCESS,
    userData: userData
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

function logoutAction() {
  return {
    type: REQUEST_LOGOUT
  }
}

function logoutSuccessAction() {
  return {
    type: REQUEST_LOGOUT_SUCCESS
  }
}

function logoutErrorAction() {
  return {
    type: REQUEST_LOGOUT_ERROR
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
        throw('Login failed.');
      })
  }
}

export function signup(name, email, password) {
  return function (dispatch, getState) {
    dispatch(loginAction());
  
    return axios.post('/api/signup', {
      name: name,
      email: email,
      password: password
    })
      .then((response) => {
        dispatch(loginSuccessAction(response.data));
      })
      .catch((error) => {
        dispatch(loginErrorAction());
        throw(error);
      })
  }
}

export function logout() {
  return function (dispatch, getState) {
    dispatch(logoutAction());
    
    return fetch('/api/logout')
      .then(response => {
        dispatch(logoutSuccessAction());
      })
      .catch(error => {
        dispatch(logoutErrorAction());
        console.log('An error occurred.', error);
      });
  }
}

export function verifyAuthenticated() {
  return function (dispatch, getState) {
    dispatch(verifyAuthenticatedAction());

    return fetch('/api/is_authenticated')
      .then(response => {
        return response.json();
      })
      .then(userData => {
        dispatch(verifyAuthenticatedSuccessAction(userData));
      })
      .catch(error => {
        dispatch(verifyAuthenticatedErrorAction());
        console.log('An error occurred.', error);
      });
  }
}