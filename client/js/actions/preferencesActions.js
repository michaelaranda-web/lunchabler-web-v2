import axios from 'axios';
import { fetchRestaurants } from './restaurantsActions';

export function fetchPreferences(restaurantId) {
  var restaurantQueryParam = !!restaurantId ? `?restaurant=${restaurantId}` : '';
  
  return axios.get(`/api/preferences${restaurantQueryParam}`)
    .then(
      response => response.data,
      error => console.log('An error occurred.', error)
    )
}

export function removePreference(userId, restaurantId) {
  return axios.delete('/api/preferences', {
    params: {
      userId: userId,
      restaurantId: restaurantId  
    }
  }) 
}

//TODO: Figure out a way not to have to manually include LunchGroup when refetching restaurants
export function addPreferenceAndRefetchRestaurants(userId, restaurantId, preference, lunchGroup) {
  return function(dispatch) {
    return axios.post('/api/preferences', {
      userId: userId,
      restaurantId: restaurantId,
      preference: preference
    })
    .then(function (response) {
      return dispatch(fetchRestaurants(lunchGroup));
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
}