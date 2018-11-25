import { combineReducers } from 'redux';
import { usersReducer as users } from './users';
import { restaurantsReducer as restaurants } from './restaurants';
import { visitsReducer as visits } from './visits';

export default combineReducers({
  users,
  restaurants,
  visits
})