var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

var userData = [];


app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});



io.on('connection', function (socket) {
    console.log('a user connected');
    io.emit('user count', io.eio.clientsCount);

    socket.on('join', function(user){
        //console.log(user)
        var i = userData.find(function(item){
            return item.name === user.name
        })
        if(!i){
            userData.push(user);
        }
        io.emit("user info", userData);
    })

    socket.on('leave', function(user){
        //console.log(user)
        var i = userData.find(function(item){
            return item.name === user.name
        })
        if(i){
            userData.splice(i, 1);
        }
        io.emit("user info", userData);
    })

    socket.on('notify event', function (data) {
        io.emit('notify event', data);
        fs.writeFileSync('io_records.txt', '\n'+JSON.stringify(data), {
            flag: 'a'
        }, function(err){
            if(err) throw err;         
        });
    })
    
    socket.on('message' ,function(data){
        io.emit('message', data);
        fs.writeFileSync('io_records.txt', '\n'+JSON.stringify(data), {
            flag: 'a'
        }, function(err){
            if(err) throw err;         
        });
    })
    
    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('user count', io.eio.clientsCount);
    });

});


http.listen(3000, function () {
    console.log('listening on *:3000');
});