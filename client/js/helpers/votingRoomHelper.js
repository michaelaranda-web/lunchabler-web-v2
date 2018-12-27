export function restaurantsRankedByVotes(restaurants) {
  return restaurants.sort(sortByVoteScore)
}

function sortByVoteScore(a, b) {
  if (a.yesVotes.length > b.noVotes.length) {
    return -1;
  } else if (a.yesVotes.length < b.noVotes.length) {
    return 1;
  } else {
    return 0;
  }
}