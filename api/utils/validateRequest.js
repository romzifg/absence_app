exports.validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body)
        if (result.error) {
            return res.status(400).json({
                statusCode: 400,
                message: result.error.details[0].message.replaceAll('"', ""),
            })
        }

        if (!req.value) {
            req.value = {}
        }

        req.value["body"] = result.value
        next();
    }
}