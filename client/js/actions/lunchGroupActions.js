import { ADD_USER_TO_LUNCH_GROUP, REMOVE_USER_FROM_LUNCH_GROUP } from '../constants/constants';

function addUserToLunchGroupAction(userId) {
  return {
    type: ADD_USER_TO_LUNCH_GROUP,
    userId: userId
  }
}

function removeUserFromLunchGroupAction(userId) {
  return {
    type: REMOVE_USER_FROM_LUNCH_GROUP,
    userId: userId
  }
}

export function addUserToLunchGroup(userId) {
  return addUserToLunchGroupAction(userId)
}

export function removeUserFromLunchGroup(userId) {
  return removeUserFromLunchGroupAction(userId)
}