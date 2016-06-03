var app = require('express')();
var http = require('http').Server(app);
var ios = require('socket.io')(http);
var users = {};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
 });

var users = {};

ios.on('connection', function(socket){
  
  console.log('a user connected');

  socket.on('chat message', function(msg){
       ios.emit('chat message', "<strong>" + users[socket.id] + "</strong>  : " + msg);
   });

  socket.on('disconnect', function() {
  	console.log('user disconnected');
  });

  socket.on('join', function(name) {
  	users[socket.id] = name;
  });

});

http.listen(4000, '0.0.0.0', function(){
  console.log('listening on *:4000');
  });

