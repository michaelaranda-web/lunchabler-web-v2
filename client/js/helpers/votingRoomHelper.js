export function restaurantsRankedByVotes(restaurants) {
  return restaurants.sort(sortByVoteScore)
}

function sortByVoteScore(a, b) {
  if (a.score > b.score) {
    return -1;
  } else if (a.score < b.score) {
    return 1;
  } else {
    return 0;
  }
}