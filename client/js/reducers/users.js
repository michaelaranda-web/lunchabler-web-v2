import { ADD_USER, RECEIVE_USERS, RECEIVE_USERS_SUCCESS, RECEIVE_USERS_ERROR } from '../constants/constants';

export function users(state = [], action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users
    case RECEIVE_USERS_SUCCESS:
      return state
    case RECEIVE_USERS_ERROR:
      return state
    case ADD_USER:
      return [
        ...state,
        action.user
      ]
    default:
      return state
  }
}