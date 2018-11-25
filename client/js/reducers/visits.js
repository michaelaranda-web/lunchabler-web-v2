import { REQUEST_VISITS, RECEIVE_VISITS, RECEIVE_VISITS_SUCCESS, RECEIVE_VISITS_ERROR } from '../constants/constants';
import { combineReducers } from 'redux';

function visits(state = [], action) {
  switch (action.type) {
    case RECEIVE_VISITS:
      return action.visits
    case RECEIVE_VISITS_SUCCESS:
      return state
    case RECEIVE_VISITS_ERROR:
      return state
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch(action.type) {
    case REQUEST_VISITS:
      return true
    case RECEIVE_VISITS:
      return false
    default:
      return state
  }
}

export const visitsReducer = combineReducers({
  all: visits,
  isFetching: isFetching
})
