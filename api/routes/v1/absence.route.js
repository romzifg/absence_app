const express = require('express');
const router = express.Router();
const AbsenceController = require('../../controllers/v1/Absence.controller');
const { tokenMiddleware } = require('../../middlewares/token.middleware');
const { validateRequest } = require('../../utils/validateRequest');
const { StoreAbsenceSchema } = require('../../validation/Absence.schema');

router.get('/', tokenMiddleware, AbsenceController.getAbsence)
router.get('/generate-report', tokenMiddleware, AbsenceController.generateReport)
router.post('/', tokenMiddleware, validateRequest(StoreAbsenceSchema), AbsenceController.storeAbsence)

module.exports = router