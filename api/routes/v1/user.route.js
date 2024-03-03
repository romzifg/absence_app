const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/v1/User.controller');
const { tokenMiddleware } = require('../../middlewares/token.middleware')

router.get('/', tokenMiddleware, UserController.getUser)
router.post('/', tokenMiddleware, UserController.storeUser)
router.post('/bulk-user', tokenMiddleware, UserController.userBulkCreate)
router.put('/:id', tokenMiddleware, UserController.updateUser)
router.delete('/:id', tokenMiddleware, UserController.deleteUser)

module.exports = router