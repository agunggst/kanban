const express = require('express')
const app = express()
const cors = require('cors')
const socket = require('socket.io')
require('dotenv').config()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())

app.use('/', require('./routers'))
app.use(require('./errorHandler/errorHandler'))

const server = app.listen(port, () => {
    console.log('This Server is Running on Port: ', port)
})

const io = socket(server)

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)

    socket.on('shoot', (data) => {
        io.sockets.emit('shootBack', data)
    })
})