const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/v1/User.controller');
const { tokenMiddleware } = require('../../middlewares/token.middleware');
const { validateRequest } = require('../../utils/validateRequest');
const { StoreUserSchema } = require('../../validation/User.schema');

router.get('/', tokenMiddleware, UserController.getUser)
router.post('/', tokenMiddleware, validateRequest(StoreUserSchema), UserController.storeUser)
router.post('/bulk-user', tokenMiddleware, UserController.userBulkCreate)
router.put('/:id', tokenMiddleware, UserController.updateUser)
router.delete('/:id', tokenMiddleware, UserController.deleteUser)

module.exports = router