const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    static login(request, response, next) {

    }

    static register(request, response, next){
        let newData = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        }
        User.findOne({
            where: {
                email: newData.email
            }
        })
        .then( result => {
            if(result){
                throw {
                    status_code: 400,
                    message: 'Email Already Registered'
                }
            }else{
                return User.create(newData)
            }
        } )
        .then( result => {
            let token = jwt.sign({
                id: result.id,
                name: result.name,
                email: result.email
            }, process.env.JWT_SECRET)
        } )
        .catch( err => {
            next(err)
        } )
    }

}

module.exports = UserController