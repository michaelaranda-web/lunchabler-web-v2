import axios from 'axios';

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

export function addPreference(userId, restaurantId, preference) {
  return axios.post('/api/preferences', {
    userId: userId,
    restaurantId: restaurantId,
    preference: preference
  })
  .catch(function (error) {
    console.log(error);
  }); 
}