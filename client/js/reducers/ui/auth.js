import { REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_ERROR, 
          REQUEST_LOGOUT, REQUEST_LOGOUT_SUCCESS, REQUEST_LOGOUT_ERROR,
          VERIFY_AUTHENTICATED, VERIFY_AUTHENTICATED_SUCCESS, VERIFY_AUTHENTICATED_ERROR } from '../../constants/constants';
import { combineReducers } from 'redux';

function loggingIn(state = false, action) {
  switch(action.type) {
    case REQUEST_LOGIN:
      return true
    case REQUEST_LOGIN_SUCCESS:
      return false
    case REQUEST_LOGIN_ERROR:
      return false
    default:
      return state
  }
}

function loggingOut(state = false, action) {
  switch(action.type) {
    case REQUEST_LOGOUT:
      return true
    case REQUEST_LOGOUT_SUCCESS:
      return false
    case REQUEST_LOGOUT_ERROR:
      return false
    default:
      return state
  }
}

function verifyingAuthenticated(state = false, action) {
  switch(action.type) {
    case VERIFY_AUTHENTICATED:
      return true
    case VERIFY_AUTHENTICATED_SUCCESS:
      return false
    case VERIFY_AUTHENTICATED_ERROR:
      return false
    default:
      return state
  }
}

function isAuthenticated(state = false, action) {
  switch(action.type) {
    case REQUEST_LOGIN_SUCCESS:
      return true
    case VERIFY_AUTHENTICATED_SUCCESS:
      return action.loggedIn
    case REQUEST_LOGOUT_SUCCESS:
      return false
    default:
      return state
  }
}

function user(state = {}, action) {
  switch(action.type) {
    case REQUEST_LOGIN_SUCCESS:
      return action.user
    default:
      return state
  }
}

export const authReducer = combineReducers({
  verifyingAuthenticated: verifyingAuthenticated,
  loggingIn: loggingIn,
  loggingOut: loggingOut,
  isAuthenticated: isAuthenticated,
  user: user
})
