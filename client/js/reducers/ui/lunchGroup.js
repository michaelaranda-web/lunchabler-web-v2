import { ADD_USER_TO_LUNCH_GROUP, REMOVE_USER_FROM_LUNCH_GROUP } from '../../constants/constants';

export function lunchGroupReducer(state = [], action) {
  switch (action.type) {
    case ADD_USER_TO_LUNCH_GROUP:
      return [...state, action.userId]
    case REMOVE_USER_FROM_LUNCH_GROUP:
      return state.filter((userId) => userId !== action.userId)
    default:
      return state
  }
}