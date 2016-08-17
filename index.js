var app = require('express')();
var http = require('http').Server(app);
var ios = require('socket.io')(http);
var users = {};

app.set('port', (process.env.PORT || 5000));


app.get('/', function(req, res){
  	res.sendFile(__dirname + '/index.html');
 }).listen(app.get('port'), function() {
	console.log('App is running, server is listening on port ', app.get('port'));
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

