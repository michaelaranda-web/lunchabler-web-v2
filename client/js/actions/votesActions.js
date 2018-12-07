import axios from 'axios';
import fetch from 'cross-fetch';
// import { REQUEST_VOTES, RECEIVE_VOTES, RECEIVE_VOTES_SUCCESS, RECEIVE_VOTES_ERROR } from '../constants/constants';

// function requestVotes() {
//   return {
//     type: REQUEST_VOTES
//   }
// }

// function receiveVotes(votes) {
//   return {
//     type: RECEIVE_VOTES,
//     votes: votes
//   }
// }

// function receiveVotesError() {
//   return {
//     type: RECEIVE_VOTES_ERROR
//   }
// }

// export function fetchVotes(restaurantId, numVotes=5) {
//   return function(dispatch) {
//     dispatch(requestVotes())
    
//     var votesQuery = `/api/votes?limit=${numVotes}`;
    
//     if (!!restaurantId) {
//       votesQuery += `&restaurant=${restaurantId}`;
//     }
    
//     return axios.get(votesQuery)
//       .then(
//         response => response.data,
//         error => {
//           dispatch(receiveVotesError())
//           console.log('An error occurred.', error)
//         }
//       )
//       .then(json =>
//         dispatch(receiveVotes(json))
//       )
//   }
// }

export function getVotes() {
  return fetch('/api/votes')
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    );
}

export function createNewVote(lunchGroup) {
  return axios.post('/api/votes', {
    lunchGroup: lunchGroup
  })
}
