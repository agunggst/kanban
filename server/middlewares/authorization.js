const { Task } = require('../models')

module.exports = (request, response, next) => {
    let task_id = request.params.id
    Task.findByPk(task_id)
    .then( result => {
        if(result){
            if(result.user_id == request.user_data.id){
                next()
            }else{
                throw {
                    status_code: 400,
                    message: 'Unauthorized'
                }
            }
        }else{
            throw {
                status_code: 404,
                message: 'Task Not Found'
            }
        }
    } )
    .catch( err => {
        next(err)
    } )
}