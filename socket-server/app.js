var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, { pingInterval: 700 });
 
var clientSocket;

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit("server_sent", function(){
        console.log('emikt send');
    });

    socket.on('send_lotus_data', function (msg) {
        var lotusData = JSON.parse(decodeURI(msg));
        console.log(lotusData);
        console.log("-------------");
        console.log(lotusData.id);
        console.log("------------");
        socket.emit('success', { message : "question info successfuly sent to socket server"});
        socket.broadcast.emit('lotus_sent', lotusData);
    });

    socket.on('send_fish_data', function (msg) {
        var lotusData = JSON.parse(decodeURI(msg));
        console.log(lotusData);
        console.log("-------------");
        console.log(lotusData.id);
        console.log("------------");
        socket.emit('success', { message : "question info successfuly sent to socket server"});
        socket.broadcast.emit('fish_sent', lotusData);
    });

    socket.on('add_fish_socket', (msg)=>{
        clientSocket = socket;
    });

    socket.on('add_lotus_socket', (msg)=>{
        clientSocket = socket;
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
 
http.listen(3000, function () {
    console.log('listening on *:3000');
});

