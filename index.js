var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');



app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});


io.on('connection', function (socket) {
    console.log('a user connected');

    socket.emit('news', { hello: 'world' });

    socket.on('notify event', function (data) {
        socket.emit('notify event', data);
        fs.writeFileSync('io_records.txt', '\n'+JSON.stringify(data), {
            flag: 'a'
        }, function(err){
            if(err) throw err;         
        });
    })

    
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});


http.listen(3000, function () {
    console.log('listening on *:3000');
});