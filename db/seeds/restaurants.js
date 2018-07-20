const userObjectIds = require('../userObjectIds');

module.exports = [
  {
    "name":"McDonalds", 
    "mehs": [userObjectIds["michael"], userObjectIds["geoff"], userObjectIds["larry"]], 
    "nos": [userObjectIds["jill"],userObjectIds["beth"]], 
    "comments":
      [
        {"user": userObjectIds["michael"], "content": "Prices are good but the food is unhealthy."},
        {"user": userObjectIds["jill"], "content": "Why is McDonald's even on this list?"},
        {"user": userObjectIds["larry"], "content": "What are the McNuggets made of?"},
        {"user": userObjectIds["geoff"], "content": "I just wanted to add a comment."},
        {"user": userObjectIds["beth"], "content": "Never again."}
      ]
  },
  {
    "name":"Nutmeg", 
    "mehs": [userObjectIds["arlene"]], 
    "nos": [], 
    "comments": []
  },
  {
    "name":"Snooze", 
    "mehs": [userObjectIds["matt"], userObjectIds["jill"], userObjectIds["larry"], userObjectIds["brad"]], 
    "nos": [userObjectIds["beth"]], 
    "comments":
      [
        {"user": userObjectIds["michael"], "content": "The best!"},
        {"user": userObjectIds["matt"], "content": "The eggs benedict are pretty good, but there should be more hollandaise sauce."},
        {"user": userObjectIds["beth"], "content": "I will never wait in that line again."}
      ]
  }
]