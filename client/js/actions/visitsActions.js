import axios from 'axios';

export function fetchRecentVisits(numVisits=5) {
  // return axios.get(`/api/visits?limit=${numVisits}`)
  //   .then(
  //     response => response.data,
  //     error => console.log('An error occurred.', error)
  //   )
}

export function fetchRestaurantVisits(restaurantId, numVisits=5) {
  // return axios.get(`/api/visits?restaurant=${restaurantId}&limit=${numVisits}`)
  //   .then(
  //     response => response.data,
  //     error => console.log('An error occurred.', error)
  //   )
}

export function addVisit(restaurantId) {
  return axios.post('/api/visits', {
    restaurantId: restaurantId
  })
}

// export function addPreferenceAndRefetchRestaurants(userId, restaurantId, preference) {
//   return function(dispatch) {
//     return axios.post('/api/preferences', {
//       userId: userId,
//       restaurantId: restaurantId,
//       preference: preference
//     })
//     .catch(function (error) {
//       console.log(error);
//     }); 
//   }
// }