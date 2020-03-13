const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library')
require('dotenv').config()
const client = new OAuth2Client(process.env.CLIENT_ID)

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

    static googleLogin(request, response, next){
        let token = request.body.token
        let data_google
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then( ticket => {
            const payload = ticket.getPayload()
            data_google = {
                name: payload.name,
                email: payload.email
            }
            return User.findOne({
                where: {
                    email: data_google.email
                }
            })
        } )
        .then( result => {
            if(result != null){
                let access_token = jwt.sign({
                    id: result.id,
                    name: result.name,
                    email: result.email
                }, process.env.JWT_SECRET)
                response.status(200).json({access_token})
            }else{
                data_google.password = process.env.GPASS
                return User.create(data_google)
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
            console.log('error google login', err)
            next(err)
        } )
    }

}

module.exports = UserController