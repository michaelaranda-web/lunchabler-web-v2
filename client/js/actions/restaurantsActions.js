import { REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS } from '../constants/constants';
import fetch from 'cross-fetch';

function requestRestaurants() {
  return {
    type: REQUEST_RESTAURANTS
  }
}

function receiveRestaurants(restaurants) {
  return {
    type: RECEIVE_RESTAURANTS,
    restaurants: restaurants
  }
}

export function fetchRestaurants() {
  return function (dispatch) {
    dispatch(requestRestaurants())

    return fetch('/api/restaurants')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveRestaurants(json))
      )
  }
}