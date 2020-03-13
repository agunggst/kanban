const user_router = require('express').Router()
const UserController = require('../controllers/UserController')

user_router.post('/login', UserController.login)
user_router.post('/googleLogin', UserController.googleLogin)
user_router.post('/register', UserController.register)

module.exports = user_router