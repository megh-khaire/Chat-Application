const express = require('express');
const http = require('http')
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
//Configuring socket io to work with server
const io = socketio(server); 

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));

//Listening for socket connection events
io.on('connection', (socket) =>{
    //Emitting a message event from the server to welcome new user
    socket.emit('message','Welcome!');
    //Broadcasts a message to all other sockets except the one emitting the event
    socket.broadcast.emit('message','A new user has joined');
    //Receiving client event client-send-msg
    socket.on('client-send-msg',(message,callback) => {
        //Emits event to every single available connection
        io.emit('server-send-msg',message)
        callback();
    })

    //Emitting a disconnect event from the server to handle disconnection
    socket.on('disconnect', () => {
        socket.broadcast.emit('message','A user has disconnected');
    });
})

server.listen(port , ()=>{
    console.log(`Server is up on port ${port}`);
});