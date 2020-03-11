const router = require('express').Router()

router.use('/users', require('./user_router'))
router.use('/tasks', require('./task_router'))

module.exports = router