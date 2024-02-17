const multer = require('multer');

// const FILE_TYPE = {
//     'application/vnd.ms-excel': "xlsx"
// }

const storageFile = multer.diskStorage({
    destination: function (req, file, callback) {
        // const isValidFormat = FILE_TYPE[file.mimetype]
        // let uploadErr = new Error("Invalid Format File")

        // if (isValidFormat) {
        //     uploadErr = null
        // }

        callback(null, 'public/excel')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')
        const uniqueFilename = Date.now() + "-" + fileName

        cb(null, uniqueFilename)
    }
})

exports.uploadOption = multer({ storage: storageFile })