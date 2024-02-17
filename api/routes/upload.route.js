const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/Upload.controller');
const { uploadOption } = require('../helpers/fileUpload');

router.post('/', uploadOption.single('file'), UploadController.uploadFile)

module.exports = router