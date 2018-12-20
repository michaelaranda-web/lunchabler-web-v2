if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var http = require('http');
var path = require('path');
var express = require('express');
const expressSession = require('express-session');
const socketIo = require("socket.io");
const sockets = [];

var router = express();
var server = http.createServer(router);
const io = socketIo(server);

var bodyParser = require('body-parser');
router.use(express.static(path.resolve(__dirname, 'dist')));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const async = require('async');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const moment = require('moment');
const RestaurantRanker = require('./db/helpers/restaurantRanker');
const collectionAsObject = require('./helpers/helpers.js').collectionAsObject;
const restaurantPreferencesByUserId = require('./helpers/helpers.js').restaurantPreferencesByUserId;
const userPreferencesByRestaurantId = require('./helpers/helpers.js').userPreferencesByRestaurantId;

const yelp = require('yelp-fusion');

const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  
router.use(
  expressSession(
    {
      secret: "temporarysecret",
      cookie: {
        maxAge: null
      }
    }
  )
);

const flash = require('connect-flash');
const bcrypt = require('bcrypt-nodejs')

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validPassword(passwordSubmission, userPassword) {
  return bcrypt.compareSync(passwordSubmission, userPassword);
}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.status(401);
  res.send("User not logged in");
}

var db_url = (process.env.NODE_ENV == 'production') ? process.env.MONGODB_URI : 'mongodb://localhost:27017';
var dbName = (process.env.NODE_ENV == 'production') ? process.env.MONGODB_DB_NAME : 'lunchabler';

/****** SocketIO/Voting functions ******/

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

function getCurrentVotes(sessionId, votesCol) {
  return votesCol.findOne({session_id: sessionId});
}

function updateVotes(voteSubmission, votesCol) {
  var voteValue = voteSubmission.vote === "yes" ? 1 : -1;
  var updateOptions = {upsert: true};
  
  return votesCol.updateOne(
          {session_id: voteSubmission.session_id, "restaurants.id": ObjectId(voteSubmission.restaurant.id)},
          {$inc: {"restaurants.$.score": voteValue}},
          updateOptions)
}

//TODO: Should MongoClient connect/disconnect per db call?
MongoClient.connect(db_url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const restaurantsCol = db.collection('restaurants');
  const usersCol = db.collection('users');
  const preferencesCol = db.collection('preferences');
  const visitsCol = db.collection('visits');
  const votesCol = db.collection('votes');
  
  passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
      // console.log("***")
      // console.log("before nextTick")
    
      process.nextTick(function() {
        // console.log("***")
        // console.log("after nextTick")
        
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        usersCol.findOne({ 'email': email }, function(err, user) {
          // if there are any errors, return the error before anything else
          if (err)
              return done(err);
  
          // if no user is found, return the message
          if (!user)
              return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
  
          // if the user is found but the password is wrong
          if (!validPassword(password, user.password))
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
  
          // all is well, return successful user
          return done(null, user);
        });
      })
    }));
  
  passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        usersCol.findOne({'email': email}, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
              usersCol.insertOne(
                {
                  name: req.body.name,
                  email: email,
                  password: generateHash(password)
                },
                null,
                (err, result) => {
                  if (err)
                    throw err;
                  return done(null, result.ops[0]);
                }
              )
            }
        });    
      });
    }
  ));
  
  passport.serializeUser(function (user, cb) {
    cb(null, user._id);
  });
   
  passport.deserializeUser(function (id, cb) {
    usersCol.findOne({"_id": ObjectId(id)})
      .then((user) => {
        cb(null, user);
      })
  });
  
  router.use(passport.initialize());
  router.use(passport.session());
  router.use(flash());
  
  router.get('/api/is_authenticated', function (req, res) {
    res.json({
      loggedIn: !!req.user
    });
  })
  
  router.post('/api/login', passport.authenticate('local-login'), function(req, res) {
    // console.log("***");
    // console.log(req.user);
    var user = req.user;
    res.json({
      name: user.name,
      email: user.email,
      "_id": user._id
    });
  });
  
  router.post('/api/signup', passport.authenticate('local-signup'), function(req, res) {
    var user = req.user;
    res.json({
      name: user.name,
      email: user.email,
      "_id": user._id
    });  
  });
   
  router.get('/api/logout', function (req, res) {
    req.logout();
    res.status(200);
    res.send("Log out successful");
  });

  //TODO: Reference https://community.risingstack.com/redis-node-js-introduction-to-caching/ for caching eventual Yelp calls.

  router.get('/api/users', function(req, res) {
    usersCol.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      res.json(collectionAsObject(docs));
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
      console.log("[Server] Added User: " + req.body.name);
      res.send(req.body);
    });
  });
  
  router.patch('/api/users', (req, res) => {
    usersCol.updateOne(
      {name: req.body.previousName},
      {$set: {name: req.body.name}},
      (err) => {
        if(err) {
          console.log(err);
        }
        console.log("[Server] Updated User " + req.body.previousName + " to " + req.body.name);
        res.send(req.body);
      }
    );
  });
  
  router.get('/api/restaurants', function(req, res) {
    var lunchGroupUserIds = req.query.lunchGroupUserIds || [];
    
    new RestaurantRanker(db, lunchGroupUserIds).getRankedRestaurants(function(restaurants) {
      res.send(restaurants);
    });
  });
  
  router.put('/api/restaurants/:id/add_comment', (req, res) => {
    var commentUser = req.body.comment.user;
    var commentText = req.body.comment.text;
    var comment = {
      user: commentUser,
      text: commentText
    }
    var restaurantId = req.params.id
    console.log(restaurantId);
    
    restaurantsCol.updateOne(
      {"_id": ObjectId(restaurantId)},
      {$push: { comments: comment }},
      (err, restaurantDoc) => {
        if(err) {
          console.log(err);
        }
        console.log("[Server] Added Comment to Restaurant: " + restaurantId);
        res.send(req.body);
      });
  });
  
  router.post('/api/restaurants', (req, res) => {
    var submittedRestaurant = req.body.restaurant; 
    
    let restaurant = {
      name: submittedRestaurant.name,
      yelpId: submittedRestaurant.yelpId,
      displayAddress1: submittedRestaurant.displayAddress1,
      displayAddress2: submittedRestaurant.displayAddress2,
      distance: submittedRestaurant.distance,
      url: submittedRestaurant.url,
      imageUrl: submittedRestaurant.imageUrl
    };
  
    restaurantsCol.insert(restaurant, (err) => {
      if(err) {
        console.log(err);
      }
      console.log("[Server] Added Restaurant: " + restaurant.name);
      res.send(req.body);
    });
  });
  
  router.get('/api/preferences', function(req, res) {
    var preferencesQuery = {}
    var responseFormatter;
    
    if (!!req.query.restaurant) {
      if (!ObjectId.isValid(req.query.restaurant)) {
        res.status(400);
        res.send("Error fetching preferences for restaurant " + req.query.restaurant);
      } else {
        preferencesQuery = {
          restaurant: ObjectId(req.query.restaurant)
        }
        responseFormatter = restaurantPreferencesByUserId;
      }
    } else if (!!req.query.user) {
      if (!ObjectId.isValid(req.query.user)) {
        res.status(400);
        res.send("Error fetching preferences for user " + req.query.user);
      } else {
        preferencesQuery = {
          user: ObjectId(req.query.user)
        }
        responseFormatter = userPreferencesByRestaurantId;
      }
    }
    
    preferencesCol.find(preferencesQuery).toArray(function(err, docs) {
      assert.equal(err, null);
      
      res.json(responseFormatter(docs));
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
  
  router.post('/api/preferences', (req, res) => {
    var requestBodyValid = ObjectId.isValid(req.body.userId) && ObjectId.isValid(req.body.restaurantId) && ["yes", "meh", "no"].includes(req.body.preference);
    
    if (requestBodyValid) {
      let preference = {
        restaurant: ObjectId(req.body.restaurantId),
        user: ObjectId(req.body.userId)
      };
    
      var update = {$set: {preference: req.body.preference}};
      var updateOptions = {upsert: true};
      
      preferencesCol.updateOne(preference, update, updateOptions)
        .then(() => {
          console.log("[Server] User " + req.body.userId + ": Added " + req.body.preference + " preference for restaurant " + req.body.restaurantId);
          res.send(req.body);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("[Server] Error while creating preference for User " + req.body.userId + " and Restaurant " + req.body.restaurantId);
      res.status(400);
      res.send("Error searching for restaurant on Yelp");
    }
  });
  
  router.delete('/api/preferences', (req, res) => {
    var requestBodyValid = ObjectId.isValid(req.query.userId) && ObjectId.isValid(req.query.restaurantId);
    
    if (requestBodyValid) {
      let preference = {
        restaurant: ObjectId(req.query.restaurantId),
        user: ObjectId(req.query.userId)
      };
      
      preferencesCol.deleteOne(preference)
        .then(() => {
          console.log("[Server] Deleted user " + req.query.userId + "'s preference for restaurant " + req.query.restaurantId);
          res.send(req.body);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("[Server] Error while deleting preference for User " + req.query.userId + " and Restaurant " + req.query.restaurantId);
      res.status(400);
      res.send("Error searching for restaurant on Yelp");
    }
  });
  
  router.get('/api/visits', function(req, res) {
    var visitsQuery = {};
    var limit = parseInt(req.query.limit);
    
    if (!!ObjectId.isValid(req.query.restaurant)) {
      visitsQuery = {restaurant: ObjectId(req.query.restaurant)};
    }
    
    if (!!limit && Number(limit) === limit && limit % 1 === 0) {
      visitsCol
        .find(visitsQuery)
        .sort([['date', -1]])
        .limit(limit)
        .toArray(function(err, docs) {
        assert.equal(err, null);
        
        res.json(docs);
      });
    } else {
      visitsCol.find(visitsQuery).toArray(function(err, docs) {
        assert.equal(err, null);
        
        res.json(docs);
      });
    }
  });
  
  router.post('/api/visits', (req, res) => {
    var requestBodyValid = ObjectId.isValid(req.body.restaurantId);
    
    if (requestBodyValid) {
      var now = new Date();
      var startOfDay = new Date();
      startOfDay.setHours(0,0,0,0);
      
      var endOfDay = new Date();
      endOfDay.setHours(23,59,59,999);
      
      visitsCol.findOne({date: {$gte: startOfDay, $lt: endOfDay}})
        .then((selectionForToday) => {
          if (selectionForToday) {
            console.log("[Server] Visit record already exists for today.");
            res.status(200).send({ code: "ALREADY_SUBMITTED" });
          } else {
            let visit = {
              restaurant: ObjectId(req.body.restaurantId),
              date: now
            };
            
            visitsCol.insertOne(visit)
              .then(() => {
                console.log("[Server] Record added: " + req.body.restaurantId + "was visited on " + now);
                res.send(req.body);
              })
              .catch((err) => {
                console.log(err);
              });  
          }
        })
    } else {
      console.log("[Server] Error while adding visit for " + req.body.restaurantId);
      res.status(400);
      res.send("Invalid request made: adding visit for " + req.body.restaurantId);
    }
  });
  
  router.get('/api/votes', function(req, res) {
    votesCol.find({})
      .sort([['date', -1]])
      .limit(3)
      .toArray(function(err, docs) {
      assert.equal(err, null);
      
      res.json(docs);
    });
  });
  
  router.post('/api/votes', (req, res) => {
    let currentDayString = moment().format("YYYYMMDDhmmssSS");
    let date = new Date();
    let lunchGroupUserIds = req.query.lunchGroupUserIds || [];
    
    new RestaurantRanker(db, lunchGroupUserIds).getRankedRestaurants((restaurants) => {
      var votingVersionRestaurants = restaurants.map((restaurant) => {
        return {
          id: restaurant._id,
          name: restaurant.name,
          score: 0
        }
      })
      
      votesCol.insertOne(
        {
          date: date,
          session_id: currentDayString,
          parameters: {},
          restaurants: votingVersionRestaurants,
          selection: null
        },
        null,
        (err, result) => {
          if (err) {
            console.log(err);
          } else
            console.log("[Server] Created new voting session " + result.ops[0]._id);
            res.json(result.ops[0].session_id);
        })
    });
  });
  
  io.on('connection', function (socket) {
    sockets.push(socket);
    console.log("[SocketIO] New connection established: " + socket.id);
    
    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      console.log("[SocketIO] User has disconnected from socket connection.");
    });

    socket.on('vote', function (voteSubmission) {
      updateVotes(voteSubmission, votesCol)
        .then(() => {
          votesCol.findOne({session_id: voteSubmission.session_id})
            .then((updatedVotes) => {
              broadcast('vote-message', updatedVotes);
            })
        })
    });
    
    socket.on('get-current-votes', function (req) {
      getCurrentVotes(req.sessionId, votesCol)
            .then((currentVotes) => {
              broadcast('vote-message', currentVotes);
            })
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
