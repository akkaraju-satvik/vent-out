const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

const port = process.env.PORT;
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New connection established')

    socket.on('ventSubmitted', function(data, callback) {
        io.emit('vent', data)
        callback(data)
    })
})

server.listen(port, function() {
    console.log(`Listening on port ${port}`)
})