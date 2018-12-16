import { combineReducers } from 'redux';
import { lunchGroupReducer as lunchGroup } from './lunchGroup';
import { authReducer as auth } from './auth';

export default combineReducers({
  lunchGroup,
  auth
})