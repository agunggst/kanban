module.exports = (err, request, response, next) => {
    if(err.status_code){
        response.status(err.status_code).json(err)
    }else if(err.name == 'SequelizeValidationError'){
        response.status(400).json({
            status_code: 400,
            message: err.errors[0].message
        })
    }else{
        response.status(500).json({
            status_code: 500,
            message: 'System Error',
            err
        })
    }
}