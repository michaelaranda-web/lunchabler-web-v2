export function alphabetizedUsers(usersObject) {
  var usersArray = Object.entries(usersObject);
  if (usersArray.length === 0) return [] ;
  
  return usersArray
    .sort((a, b) => {
      var nameA = a[1].name;
      var nameB = b[1].name;
      
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    })
    .reduce((acc, cur) => {
      acc.push(cur[1]);
      return acc;
    }, [])
}