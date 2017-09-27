var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});


io.on('connection', function (socket) {
    console.log('a user connected');

    socket.emit('news', { hello: 'world' });


    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});



http.listen(3000, function () {
    console.log('listening on *:3000');
});