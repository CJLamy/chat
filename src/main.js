// var socket = io();
// $('form').submit(function(){
//   socket.emit('chat message', $('#m').val());
//   $('#m').val('');
//   return false;
// });

var socket = io();
$('form').submit(function() {
  socket.emit('chat message', $('#user_message').val());
  $('#user_message').val('');
  //Don't refresh the page
  return false;
});

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
});
