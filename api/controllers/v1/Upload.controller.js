exports.uploadFile = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400)
            throw new Error('File is empty')
        }

        const filename = file.filename
        const pathFile = `${req.protocol}://${req.get('host')}/public/excel/${filename}`

        return res.status(200).json({
            statusCode: 200,
            message: 'Absence Success',
            data: pathFile
        })
    } catch (err) {
        next(err)
    }
}