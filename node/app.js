
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


var application_root = __dirname
, express = require("express")
, path = require("path")
, routes = require('./routes')
, mongoose = require('mongoose');


var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);



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

var ThoughtModelSchema = new Schema({  
  thinker: { type: String, required: true },  
  thinkee: { type: String, required: true },  
  thoughtStarted: { type: Date, default: Date.now }
});

var ThoughtModel = mongoose.model('ThoughtModel', ThoughtModelSchema);  


// routes
app.get('/api/thoughts', routes.api_thoughts);



app.get('/', function(err,res){
  // var ThoughtModel = mongoose.model('ThoughtModel', ThoughtModel);
  ThoughtModel.find(function(err, thoughts){
  res.render('index.jade', { title: 'WhosThinkingAboutWho', thoughts: thoughts, errors: [] });

  });   
  });



app.get('/api', routes.api);

app.post('/api/think', function(req, res){

  thought = new ThoughtModel({
    thinker: req.body.thinker,
    thinkee: req.body.thinkee
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

app.post('api/unthink',function(req, res){
  ThoughtModel.remove({thinker: req.thinker}, function(err){
    if(err){
      return handleError(err);
    } else {
      console.log("removed");
    }
  });
});







io.sockets.on('connection', function (socket) {
	console.log('We have connection');
  socket.emit('news', { hello: 'world' });
  socket.on('News', function (data) {
    console.log(data);
  });
});



// Launch server
server.listen(3000);