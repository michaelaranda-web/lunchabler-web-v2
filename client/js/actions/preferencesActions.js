import axios from 'axios';
import { fetchRestaurants } from './restaurantsActions';

//TODO: Figure out a way not to have to include LunchGroup when refetching restaurants
export function addPreferenceAndRefetchRestaurants(userId, restaurantId, preference, lunchGroup) {
  return function(dispatch) {
    axios.post('/api/preferences', {
      userId: userId,
      restaurantId: restaurantId,
      preference: preference
    })
    .then(function (response) {
      dispatch(fetchRestaurants(lunchGroup));
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
}