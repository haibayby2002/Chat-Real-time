var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

user = ['quyhai', 'th', 'abc'];

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    socket.broadcast.emit('User-logout', socket.username);
  });
  socket.on('Login-request', function(data){  //Listen login request
    
    if(user.indexOf(data) >= 0){  //Already have user
        socket.emit('LoginFail');
        console.log('Failed');
    }
    else{                         //Don't have user
        socket.username = data;
        user.push(data);
        socket.emit('LoginSuccess', user);
        socket.broadcast.emit('NewUserConnected', data);
        console.log('Success ' + socket.username);

        // --------------------------------------------Send the online user to all
        io.emit('UserChange', user);
      }
  });

  socket.on('user-logout', function(){
    user.splice(user.indexOf(socket.username), 1);
    io.emit('UserChange', user);
    socket.disconnect();
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});