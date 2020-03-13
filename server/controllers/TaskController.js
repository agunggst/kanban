const { Task } = require('../models')

class TaskController {
    static create(request, response, next){
        let newData = {
            title: request.body.title,
            category: request.body.category,
            description: request.body.description,
            user_id: request.user_data.id
        }
        Task.create(newData)
        .then( result => {
            response.status(201).json({data: result, message: 'Create Task Successfully'})
        } )
        .catch( err => {
            next(err)
        } )
    }

    static read(request, response, next){
        Task.findAll({
            where: {
                user_id: request.user_data.id
            },
            order: [
                ['id', 'ASC']
            ]
        })
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static readById(request, response, next){
        let task_id = request.params.id
        Task.findByPk(task_id)
        .then( result => {
            if(result){
                response.status(200).json(result)
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

    static update(request, response, next){
        let task_id = request.params.id
        let newData = {
            title: request.body.title,
            category: request.body.category,
            description: request.body.description
        }
        Task.findByPk(task_id)
        .then( result => {
            if(result){
                return Task.update(newData, {
                    where: {
                        id: task_id
                    }
                })
            }else{
                throw {
                    status_code: 404,
                    message: 'Task Not Found'
                }
            }
        } )
        .then( result => {
            response.status(200).json({
                message: 'Update Task Successfully'
            })
        } )
        .catch( err => {
            next(err)
        } )
    }

    static delete(request, response, next){
        let task_id = request.params.id
        Task.findByPk(task_id)
        .then( result => {
            if(result){
                return Task.destroy({
                    where: {
                        id: task_id
                    }
                })
            }else{
                throw {
                    status_code: 404,
                    message: 'Task Not Found'
                }
            }
        } )
        .then( result => {
            response.status(200).json({
                message: 'Delete Task Successfully'
            })
        } )
        .catch( err => {
            next(err)
        } )
    }
}

module.exports = TaskController