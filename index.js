var express = require('express');
var app = express();

var server = require('http').createServer(app);

var http = require('http').Server(app);
var io = require('socket.io')(server);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/src'));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/login', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

io.listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
