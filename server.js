var http = require('http');
var path = require('path');

var express = require('express');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'dist')));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var db_url = (process.env.NODE_ENV == 'production') ? process.env.MONGODB_URI : 'mongodb://localhost:27017';
var dbName = (process.env.NODE_ENV == 'production') ? process.env.MONGODB_DB_NAME : 'lunchabler';

MongoClient.connect(db_url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const restaurantsCol = db.collection('restaurants');
  const usersCol = db.collection('users');

  //TODO: Reference https://community.risingstack.com/redis-node-js-introduction-to-caching/ for caching eventual Yelp calls.

  router.get('/api/users', function(req, res) {
    usersCol.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      res.json(collectionAsObject(docs));
    });
  });
  
  router.get('/api/restaurants', function(req, res) {
    restaurantsCol.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      res.send(docs);
    });
  });
  
  // router.put('/api/users', (req, res) => {
  //   let user = {
  //     name: req.body.name
  //   };
  
  //   usersCol.insert(user, (err) => {
  //     if(err) {
  //       console.log(err);
  //     }
  //     console.log("[Server] Added Name: " + req.body.name);
  //     res.send(req.body);
  //   });
  // });
  
  router.get('*', function(req, res) {
    res.sendfile(path.resolve(__dirname, 'dist/index.html'));
  });
  
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
  });  
});

let collectionAsObject = (coll) => {
  return coll.reduce(function(acc, cur) {
    acc[cur._id] = cur;
    return acc;
  }, {});
}
