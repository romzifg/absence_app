const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/v1/Auth.controller');
const { tokenMiddleware } = require('../../middlewares/token.middleware')

router.post('/login', tokenMiddleware, AuthController.login)
router.post('/give-access', tokenMiddleware, AuthController.giveAccess)
router.delete('/remove-access/:id', tokenMiddleware, AuthController.removeAccess)

module.exports = router