const express = require('express');
const router = express.Router();

const AbsenceRoute = require("./absence.route")
const AuthRoute = require("./auth.route")
const UploadRoute = require("./upload.route")
const UserRoute = require("./user.route")

router.use('/auth', AuthRoute)
router.use('/absence', AbsenceRoute)
router.use('/user', UserRoute)
router.use('/upload', UploadRoute)

module.exports = router