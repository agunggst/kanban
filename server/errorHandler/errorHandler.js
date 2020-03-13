module.exports = (err, request, response, next) => {
    if(err.status_code){
        response.status(err.status_code).json(err)
    }else if(err.name == 'SequelizeValidationError'){
        let err_message = []
        err.errors.forEach(element => {
            err_message.push(element.message)
        })
        response.status(400).json({
            status_code: 400,
            message: err_message
        })
    }else{
        response.status(500).json({
            status_code: 500,
            message: 'System Error',
            err
        })
    }
}