const ObjectId = require('mongodb').ObjectID;

module.exports = class RestaurantRanker {
  constructor(db, lunchGroupUserIds) {
    this.db = db;
    this.lunchGroupUserIds = lunchGroupUserIds;
  }
  
  getRankedRestaurants(callback) {
    if (this.lunchGroupUserIds.length > 0) {
      var self = this;
      
      self._getPreferencesForLunchGroup(this.lunchGroupUserIds, function(err, lunchGroupPreferences) {
        var preferencedRestaurantRankings = self._getPreferencedRestaurantRankings(lunchGroupPreferences);
        
        self._getRestaurants(function(err, restaurants) {
          return callback(self._getSortedRestaurantRecords(restaurants, preferencedRestaurantRankings));
        });
      });
    } else {
      this.db.collection('restaurants').find({}).toArray(function(err, restaurants) {
        return callback(restaurants);
      });
    }
  }
  
  /*
   * PRIVATE
   */
  
  _getPreferencesForLunchGroup(lunchGroupUserIds, callback) {
    var lunchGroupQuery = lunchGroupUserIds.map(function(userId) {
      if (ObjectId.isValid(userId)) {
        return {user: ObjectId(userId)}
      }
    });
    
    this.db.collection('preferences').find({$or: lunchGroupQuery}).toArray(function(err, lunchGroupPreferences) { callback(err, lunchGroupPreferences) });
  }
  
  _getPreferencedRestaurantRankings(lunchGroupPreferences) {
    var restaurantsScores = {};
        
    lunchGroupPreferences.map((preference) => {
      var preferenceType = preference.preference;
      var preferenceRestaurant = preference.restaurant;
      
      if (!restaurantsScores[preferenceRestaurant]) {
        restaurantsScores[preferenceRestaurant] = {restaurant: preferenceRestaurant, score: 0}; 
      }
      
      restaurantsScores[preferenceRestaurant].score += this._getPreferenceValue(preferenceType);
    });
    
    var restaurantsToBeRanked = Object.keys(restaurantsScores).map((restaurantKey) => {
      return restaurantsScores[restaurantKey];
    });
    
    var rankedRestaurantIds = restaurantsToBeRanked.sort(this.restaurantSort);
    
    var restaurantRankings = rankedRestaurantIds.map((preferenceItem) => {
      return preferenceItem.restaurant.toString();
    });
    
    return restaurantRankings;
  }
  
  _getSortedRestaurantRecords(restaurants, preferencedRestaurantRankings) {
    var restaurantsWithPreferences = [];
    var restaurantsWithoutPreferences = [];
    
    restaurants.map((restaurantItem, i) => {
      if (preferencedRestaurantRankings.includes(restaurantItem._id.toString())) {
        preferencedRestaurantRankings.map((restaurantId, i) => {
          if (restaurantId == restaurantItem._id.toString()) {
            restaurantsWithPreferences[i] = restaurantItem;
          }
        })
      } else {
        restaurantsWithoutPreferences.push(restaurantItem);
      }
    });
    
    return restaurantsWithPreferences.concat(restaurantsWithoutPreferences)
  }
  
  _getRestaurants(callback) {
    this.db.collection('restaurants').find({}).toArray(function(err, restaurants) { callback(err, restaurants) });
  }
  
  _getPreferenceValue(preference) {
    if (preference === "yes") {
      return 1;
    } else if (preference === "meh") {
      return 0;
    } else {
      return -5;
    }
  }
  
  restaurantSort(a, b) {
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    } else {
      return 0;
    }
  }
  
  // alphabetize(restaurants) {
    
  // }
}