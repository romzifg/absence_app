require('dotenv').config();

exports.notFound = (req, res, next) => {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

exports.errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode >= 400 ? res.statusCode : 500
    res.status(statusCode)

    const responseBody = {
        statusCode: statusCode,
        message: err.message,
        stack: process.env.APP_NODE_ENV === 'production' ? 'ERR' : err.stack
    }

    console.log('Error', responseBody)
    return res.json(responseBody)
}