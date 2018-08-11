import { REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS } from '../constants/constants';
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

export function fetchRestaurants(lunchGroupIdsParam) {
  return function (dispatch) {
    dispatch(requestRestaurants())
    
    var lunchGroupIds = lunchGroupIdsParam || [];
    
    var params = '';
    if (lunchGroupIds.length > 0) {
      params = '?';
      lunchGroupIds.map((userId, i) => {
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