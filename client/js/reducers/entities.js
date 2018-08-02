import { combineReducers } from 'redux';
import { usersReducer as users } from './users';
import { restaurantsReducer as restaurants } from './restaurants';

export default combineReducers({
  users,
  restaurants
})