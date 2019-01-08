export function getCurrentRestaurantVotes(lunchGroupVotes, restaurants) {
  var currentRestaurantVotes = {};
  restaurants.map((restaurant) => {
    currentRestaurantVotes[restaurant.id] = {
      yes: [],
      no: [],
      name: restaurant.name
    }
  })
  
  Object.entries(lunchGroupVotes).map((userVote) => {
    userVote[1].map((vote) => {
      if (vote.vote === "yes") {
        currentRestaurantVotes[vote.restaurant].yes.push(userVote[0])
      } else if (vote.vote === "no") {
        currentRestaurantVotes[vote.restaurant].no.push(userVote[0])
      }
    })
  })
  
  var currentRestaurantVotesArray = Object.entries(currentRestaurantVotes).map((restaurantVotes) => {
    return {
      id: restaurantVotes[0],
      name: restaurantVotes[1].name,
      yes: restaurantVotes[1].yes,
      no: restaurantVotes[1].no,
    }
  })
  
  return currentRestaurantVotesArray.sort((a,b) => {
    if (a.yes.length < b.yes.length) { return 1 };
    if (a.yes.length > b.yes.length) { return -1 };
    return 0;
  })
}