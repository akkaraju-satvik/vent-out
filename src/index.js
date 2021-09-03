const server = require('./app')
require('./db/mongoose')

server.listen(process.env.PORT, function() {
    console.log(`Listening on port ${process.env.PORT}`)
})