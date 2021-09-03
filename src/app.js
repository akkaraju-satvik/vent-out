const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Vent = require('./models/vent')

const ventRoutes = require('./routers/vent')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))
app.use(express.json())
app.use(ventRoutes)

io.on('connection', async (socket) => {
    console.log('New connection established')

    const data = await Vent.find({})
    data.forEach(item => io.emit('vent', item.data))
    socket.on('ventSubmitted', async function(data, callback) {

        const vent = new Vent({
            data: data.data
        })
        await vent.save()
        io.emit('vent', vent.data)
        callback(vent.data)
    })
})

module.exports = server;