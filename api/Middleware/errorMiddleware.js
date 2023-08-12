

export const notFound = (req, res, next)=>{
    const error = new Error('Not found')
    res.status(401)
    next(error)
}

export const errorHandler = (err, req, res, next)=>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message
    if(err.name === 'Cast Error' && err.kind === 'ObjectId'){
        statusCode = 404
        message = 'Resource not found'
    }
    res.status(statusCode).send({message, stack: process.env.NODE_ENV === 'production' ? null : err.stack })
}