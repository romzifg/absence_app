const express = require('express');
const router = express.Router();
const AbsenceController = require('../controllers/Absence.controller');
const { tokenMiddleware } = require('../middlewares/token.middleware')

router.get('/', tokenMiddleware, AbsenceController.getAbsence)
router.get('/generate-report', tokenMiddleware, AbsenceController.generateReport)
router.post('/', tokenMiddleware, AbsenceController.storeAbsence)

module.exports = router