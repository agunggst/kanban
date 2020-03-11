module.exports = (err, request, response, next) => {
    console.log(err)
    response.json(err)
}