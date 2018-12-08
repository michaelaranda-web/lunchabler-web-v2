export function restaurantsRankedByVotes(restaurantsObj) {
  var sortedRestaurantArrays = Object.entries(restaurantsObj).sort(sortByVoteScore);
  
  return sortedRestaurantArrays.map((restaurantArray) => {
    return {
      id: restaurantArray[0],
      score: restaurantArray[1].score
    }
  })
}

function sortByVoteScore(a, b) {
  if (a[1].score > b[1].score) {
    return -1;
  } else if (a[1].score < b[1].score) {
    return 1;
  } else {
    return 0;
  }
}