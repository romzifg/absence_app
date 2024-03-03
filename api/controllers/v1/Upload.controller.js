const { responseSuccess, responseBadRequest } = require('../../helpers/response');

exports.uploadFile = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400)
            throw new Error('File is empty')
        }

        const filename = file.filename
        const pathFile = `${req.protocol}://${req.get('host')}/public/excel/${filename}`

        return responseSuccess(res, pathFile)
    } catch (err) {
        console.log(err)
        return responseBadRequest(res)
    }
}