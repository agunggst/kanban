const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

class UserController {
    static login(request, response, next) {
        let data_login = {
            email: request.body.email,
            password: request.body.password
        }
        let data_user
        User.findOne({
            where: {
                email: data_login.email
            }
        })
        .then( result => {
            if(result){
                data_user = result
                return bcrypt.compare(data_login.password, result.password)
            }else{
                throw {
                    status_code: 404,
                    message: 'User Not Found'
                }
            }
        } )
        .then( result => {
            if(result){
                let token = jwt.sign({
                    id: data_user.id,
                    name: data_user.name,
                    email: data_user.email
                }, process.env.JWT_SECRET)
                response.status(200).json({access_token: token})
            }else{
                throw {
                    status_code: 400,
                    message: 'Wrong Password'
                }
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static register(request, response, next){
        let newData = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        }
        console.log(newData)
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
            response.status(201).json({access_token: token})
        } )
        .catch( err => {
            next(err)
        } )
    }

}

module.exports = UserController