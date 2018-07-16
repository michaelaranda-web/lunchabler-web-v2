var http = require('http');
var path = require('path');

var express = require('express');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var db_url = (process.env.NODE_ENV == 'production') ? process.env.MONGODB_URI : 'mongodb://localhost:27017';
const dbName = 'lunchabler';

MongoClient.connect(db_url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const restaurants = db.collection('restaurants');

  router.get('/restaurants', function(req, res) {
    restaurants.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      res.send(docs);
    });
  })
  
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
  });  
});
