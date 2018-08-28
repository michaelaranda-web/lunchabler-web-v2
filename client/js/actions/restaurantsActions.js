import { REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS } from '../constants/constants';
import axios from 'axios';
import fetch from 'cross-fetch';

function requestRestaurants() {
  return {
    type: REQUEST_RESTAURANTS
  }
}

function receiveRestaurants(sortedRestaurants) {
  return {
    type: RECEIVE_RESTAURANTS,
    sortedRestaurants: sortedRestaurants
  }
}

export function addRestaurant(restaurant) {
  return axios.post('/api/restaurants', {
    restaurant: restaurant
  }) 
}

export function fetchRestaurants() {
  return function (dispatch, getState) {
    var lunchGroup = getState().ui.lunchGroup;
    
    dispatch(requestRestaurants())
    
    var params = '';
    if (lunchGroup.length > 0) {
      params = '?';
      lunchGroup.map((userId, i) => {
        if (i > 0) {
          params += '&';
        }
        params += `lunchGroupUserIds[]=${userId}`;
      })
    }

    return fetch('/api/restaurants' + params)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveRestaurants(json))
      )
  }
}