module.exports = {
  collectionAsObject: function (coll) {
    return coll.reduce(function(acc, cur) {
      acc[cur._id] = cur;
      return acc;
    }, {});
  },
  restaurantPreferencesByUserId: function (coll) {
    return coll.reduce(function(acc, cur) {
      acc[cur.user.toString()] = cur.preference;
      return acc;
    }, {});
  },
  userPreferencesByRestaurantId: function (coll) {
    return coll.reduce(function(acc, cur) {
      acc[cur.restaurant.toString()] = cur.preference;
      return acc;
    }, {});
  }
}