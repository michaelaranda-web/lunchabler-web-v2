import axios from 'axios';
import { REQUEST_VISITS, RECEIVE_VISITS, RECEIVE_VISITS_SUCCESS, RECEIVE_VISITS_ERROR } from '../constants/constants';

function requestVisits() {
  return {
    type: REQUEST_VISITS
  }
}

function receiveVisits(visits) {
  return {
    type: RECEIVE_VISITS,
    visits: visits
  }
}

function receiveVisitsError() {
  return {
    type: RECEIVE_VISITS_ERROR
  }
}

export function fetchRestaurantVisits(restaurantId, numVisits=5) {
  return function(dispatch) {
    dispatch(requestVisits())
    
    var visitsQuery = `/api/visits?limit=${numVisits}`;
    
    if (!!restaurantId) {
      visitsQuery += `&restaurant=${restaurantId}`;
    }
    
    return axios.get(visitsQuery)
      .then(
        response => response.data,
        error => {
          dispatch(receiveVisitsError())
          console.log('An error occurred.', error)
        }
      )
      .then(json =>
        dispatch(receiveVisits(json))
      )
  }
}

export function addVisit(restaurantId) {
  return axios.post('/api/visits', {
    restaurantId: restaurantId
  })
}
