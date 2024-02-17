const {
    User
} = require('../models');
const validator = require('validator');
const { generateCode } = require('../helpers/generateCode');
const { responseSuccess, responseBadRequest, responseNotFound } = require('../helpers/response');

exports.getUser = async (req, res) => {
    try {
        const data = await User.findAll({ where: { deletedAt: null } })

        return responseSuccess(res, data)
    } catch (err) {
        return responseBadRequest(res)
    }
}

exports.storeUser = async (req, res) => {
    try {
        let code = ""

        code = generateCode()
        if (code === "") {
            return responseBadRequest(res, "Bad Request, Error Generate Code")
        }

        const checkUser = await User.findOne({ where: { code: code } })
        if (checkUser) {
            code = generateCode()
        }

        if (!validator.isEmail(req.body.email) || validator.isEmpty(req.body.email)) {
            return responseBadRequest(res, "Bad Request, Invalid Email")
        }
        if (validator.isEmpty(req.body.name)) {
            return responseBadRequest(res, "Bad Request, Name Cannot Be Empty")
        }

        const data = await User.create({ ...req.body, code: code })
        return responseSuccess(res, data)
    } catch (err) {
        return responseBadRequest(res)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { user_id: req.params.id, deletedAt: null } })
        if (!user) {
            return responseNotFound(res)
        }

        await user.update({ ...req.body })
        return responseSuccess(res, data.user_id)
    } catch (err) {
        return responseBadRequest(res)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { user_id: req.params.id, deletedAt: null } })
        if (!user) {
            return responseNotFound(res)
        }

        await user.update({ deletedAt: Date.now() })
        return responseSuccess(res, data.user_id)
    } catch (err) {
        return responseBadRequest(res)
    }
}