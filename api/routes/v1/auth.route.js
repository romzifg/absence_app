const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/v1/Auth.controller');
const { tokenMiddleware } = require('../../middlewares/token.middleware');
const { validateRequest } = require('../../utils/validateRequest');
const { AuthLoginSchema, GiveAccessSchema } = require('../../validation/Auth.schema');

router.post('/login', tokenMiddleware, validateRequest(AuthLoginSchema), AuthController.login)
router.post('/give-access', tokenMiddleware, validateRequest(GiveAccessSchema), AuthController.giveAccess)
router.delete('/remove-access/:id', tokenMiddleware, AuthController.removeAccess)

module.exports = router