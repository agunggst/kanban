const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())

app.use('/', require('./routers'))
app.use(require('./errorHandler/errorHandler'))

app.listen(port, () => {
    console.log('This Server is Running on Port: ', port)
})