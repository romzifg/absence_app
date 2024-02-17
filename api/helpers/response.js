exports.responseSuccess = (res, data, message) => {
    let responseMessage
    if (message) {
        responseMessage = message
    } else {
        responseMessage = "Success"
    }

    return res.status(200).json({
        statusCode: 200,
        message: responseMessage,
        data: data
    })
}

exports.responseBadRequest = (res, message) => {
    let responseMessage
    if (message) {
        responseMessage = message
    } else {
        responseMessage = "Bad Request"
    }

    return res.status(400).json({
        statusCode: 400,
        message: responseMessage,
        data: null
    })
}

exports.responseNotFound = (res, message) => {
    let responseMessage
    if (message) {
        responseMessage = message
    } else {
        responseMessage = "Not Found"
    }

    return res.status(404).json({
        statusCode: 404,
        message: responseMessage,
        data: null
    })
}