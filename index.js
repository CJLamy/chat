var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Routing
app.use(express.static(__dirname + '/src'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});