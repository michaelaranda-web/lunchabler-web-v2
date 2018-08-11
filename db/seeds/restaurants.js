const UserIds = require('../userIds');
const RestaurantIds = require('../restaurantIds');

module.exports = [
  {
    "_id": RestaurantIds["McDonalds"],
    "name":"McDonalds",
    "comments":
      [
        {"user": UserIds["michael"], "content": "Prices are good but the food is unhealthy."},
        {"user": UserIds["jill"], "content": "Why is McDonald's even on this list?"},
        {"user": UserIds["larry"], "content": "What are the McNuggets made of?"},
        {"user": UserIds["geoff"], "content": "I just wanted to add a comment."},
        {"user": UserIds["beth"], "content": "Never again."}
      ]
  },
  {
    "_id": RestaurantIds["Nutmeg"],
    "name":"Nutmeg",
    "comments": []
  },
  {
    "_id": RestaurantIds["Snooze"],
    "name":"Snooze",
    "comments":
      [
        {"user": UserIds["michael"], "content": "The best!"},
        {"user": UserIds["matt"], "content": "The eggs benedict are pretty good, but there should be more hollandaise sauce."},
        {"user": UserIds["beth"], "content": "I will never wait in that line again."}
      ]
  },
  {
    "_id": RestaurantIds["Prepkitchen"],
    "name":"Prepkitchen", 
    "comments": []
  },
  {
    "_id": RestaurantIds["Cafe Gratitude"],
    "name":"Cafe Gratitude",
    "comments": []
  },
  {
    "_id": RestaurantIds["Puesto"],
    "name":"Puesto",
    "comments": []
  }
]