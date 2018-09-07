import { REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS, RECEIVE_RESTAURANTS_SUCCESS, RECEIVE_RESTAURANTS_ERROR } from '../constants/constants';
import { combineReducers } from 'redux';
import { collectionAsObject } from '../../../helpers/helpers.js';

function sortedRestaurants(state = [], action) {
  switch (action.type) {
    case RECEIVE_RESTAURANTS:
      return action.sortedRestaurants
    case RECEIVE_RESTAURANTS_SUCCESS:
      return state
    case RECEIVE_RESTAURANTS_ERROR:
      return state
    default:
      return state
  }
}

function restaurantsById(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RESTAURANTS:
      return collectionAsObject(action.sortedRestaurants)
    case RECEIVE_RESTAURANTS_SUCCESS:
      return state
    case RECEIVE_RESTAURANTS_ERROR:
      return state
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch(action.type) {
    case REQUEST_RESTAURANTS:
      return true
    case RECEIVE_RESTAURANTS:
      return false
    default:
      return state
  }
}

export const restaurantsReducer = combineReducers({
  byId: restaurantsById,
  sorted: sortedRestaurants,
  isFetching: isFetching
})
