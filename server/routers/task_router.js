const task_router = require('express').Router()
const TaskController = require('../controllers/TaskController')

const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

task_router.post('/', authentication, TaskController.create)
task_router.get('/', authentication, TaskController.read)
task_router.put('/:id', authentication, authorization, TaskController.update)
task_router.delete('/id', authentication, authorization, TaskController.delete)

module.exports = task_router