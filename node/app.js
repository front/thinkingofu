
/**
 * Module dependencies.
 */

// var express = require('express')
//   , routes = require('./routes')
//   , user = require('./routes/user')
//   , http = require('http')
//   , path = require('path');

// var app = express();

// app.configure(function(){
//   app.set('port', process.env.PORT || 3000);
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'jade');
//   app.use(express.favicon());
//   app.use(express.logger('dev'));
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
//   app.use(express.static(path.join(__dirname, 'public')));
// });

// app.configure('development', function(){
//   app.use(express.errorHandler());
// });

// app.get('/', routes.index);
// app.get('/users', user.list);

// http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });


var application_root = __dirname,
express = require("express"),
path = require("path"),
mongoose = require('mongoose');

var app = express();

// Database

mongoose.connect('mongodb://localhost/thinkingofu_db');

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Define Schema
var Schema = mongoose.Schema;  

var ThoughtModel = new Schema({  
  thinker: { type: String, required: true },  
  thinkee: { type: String, required: true },  
  thoughtStarted: { type: Date, default: Date.now }
});

var ThoughtModel = mongoose.model('ThoughtModel', ThoughtModel);  

// Define rest api
app.get('/api/thoughts', function (req, res){
  return ThoughtModel.find(function (err, thoughts) {
    if (!err) {
      return res.send(thoughts);
    } else {
      return console.log(err);
    }
  });
});



// app.get('/', function (req, res) {
//  var thoughts = ThoughtModel.find(function (err, thoughts) {
//   if (!err) {
//     var result = "";
//     Object.keys(thoughts).forEach(function(key) {
//       var val = thoughts[key];
//       var str = "<div>" + val.thinker + " is thinking of " + val.thinkee + "</div>" ;
//       result = result + str; 
//       console.log(str);
//     });
//       res.send(result);

//  }; 

// });
// });
app.get('/', function (req, res) {
  res.render('index.jade', { title: 'WhosThinkingAboutWho', thoughts: ["one", "two"], errors: [] });
});

app.post('/api/think', function (req, res){
  var product;
  console.log("POST: ");
  console.log(req.body);
  thought = new ThoughtModel({
    thinker: req.body.thinker,
    thinkee: req.body.thinkee,
  });
  thought.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      console.log("error!!");
      return console.log(err);
    }
  });
  return res.send(thought);
});

app.get('/api', function (req, res) {
  res.send('Thinking of you API is running');
});




// Launch server
app.listen(3000);