if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var http = require('http');
var path = require('path');
var express = require('express');

var router = express();
var server = http.createServer(router);

var bodyParser = require('body-parser');
router.use(express.static(path.resolve(__dirname, 'dist')));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const RestaurantRanker = require('./db/helpers/restaurantRanker');
const collectionAsObject = require('./helpers/helpers.js');

const yelp = require('yelp-fusion');

var db_url = (process.env.NODE_ENV == 'production') ? process.env.MONGODB_URI : 'mongodb://localhost:27017';
var dbName = (process.env.NODE_ENV == 'production') ? process.env.MONGODB_DB_NAME : 'lunchabler';

//TODO: Should MongoClient connect/disconnect per db call?
MongoClient.connect(db_url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  // const restaurantsCol = db.collection('restaurants');
  const usersCol = db.collection('users');

  //TODO: Reference https://community.risingstack.com/redis-node-js-introduction-to-caching/ for caching eventual Yelp calls.

  router.get('/api/users', function(req, res) {
    usersCol.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      res.json(collectionAsObject(docs));
    });
  });
  
  router.get('/api/restaurants', function(req, res) {
    var lunchGroupUserIds = req.query.lunchGroupUserIds || [];
    
    new RestaurantRanker(db, lunchGroupUserIds).getRankedRestaurants(function(restaurants) {
      res.send(restaurants);
    });
  });
  
  router.get('/api/yelp_search', function(req, res) {
    const searchRequest = {
      term: req.query.searchText,
      location: 'rancho bernardo, ca',
      limit: 10
    };
    
    const client = yelp.client(process.env.YELP_API_KEY);
    
    client.search(searchRequest).then(response => {
      res.send(response.jsonBody.businesses);
    }).catch(e => {
      res.status(500);
      res.send("Error searching for restaurant on Yelp");
    });
  });
  
  router.post('/api/users', (req, res) => {
    let user = {
      name: req.body.name
    };
  
    usersCol.insert(user, (err) => {
      if(err) {
        console.log(err);
      }
      console.log("[Server] Added Name: " + req.body.name);
      res.send(req.body);
    });
  });
  
  router.get('*', function(req, res) {
    res.sendfile(path.resolve(__dirname, 'dist/index.html'));
  });
  
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
  });  
});
