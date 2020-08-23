
var express = require('express');

var app = express();

var staticPath = __dirname + '/static';
app.use(express.static(staticPath));

const server = app.listen(5000,  () => {
  console.log('Server is listening on http://localhost:5000');
});

var io = require('socket.io')(server);

io.on('connection',  (socket) => {
  socket.on('message',  (data ) => {
    socket.broadcast.emit('message', data);
    console.log(`data is ${data} `);
  });
  socket.on('new-user',  (data) => {
    socket.broadcast.emit('new-user', data);
    console.log(data);
  });
  
});