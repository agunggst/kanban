const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (request, response, next) => {
    try {
        let user_data = jwt.verify(request.headers.access_token, process.env.JWT_SECRET)
        User.findByPk(user_data.id)
        .then( result => {
            if(result){
                request.user_data = user_data
                next()
            }else{
                next({
                    status_code: 400,
                    message: 'Unauthenticated'
                })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }catch(err){
        next(err)
    }
}