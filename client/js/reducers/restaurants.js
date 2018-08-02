import { RECEIVE_RESTAURANTS, RECEIVE_RESTAURANTS_SUCCESS, RECEIVE_RESTAURANTS_ERROR } from '../constants/constants';
import { combineReducers } from 'redux';

function restaurants(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RESTAURANTS:
      return action.restaurants
    case RECEIVE_RESTAURANTS_SUCCESS:
      return state
    case RECEIVE_RESTAURANTS_ERROR:
      return state
    default:
      return state
  }
}

export const restaurantsReducer = combineReducers({
  byId: restaurants
}) 