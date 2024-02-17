require('dotenv').config();

exports.tokenMiddleware = (req, res, next) => {
    if (!req.headers["authorization"]) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Api Token Not Found'
        })
    }

    if (req.headers["authorization"] !== process.env.APP_API_TOKEN) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Api Token Not Found'
        })
    }

    next()
}