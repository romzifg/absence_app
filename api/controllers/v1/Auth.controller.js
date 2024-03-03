const {
    User,
    Auth
} = require('../../models');
const jwt = require('jsonwebtoken')
const { responseSuccess, responseBadRequest, responseNotFound } = require('../../helpers/response');
require('dotenv').config()

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return responseBadRequest(res, 'Error Validation, Email or Password cannot be empty')
        }

        const userData = await User.findOne({ where: { email: req.body.email } })
        if (!userData) {
            return responseBadRequest(res, "Invalid Email")
        }
        const auth = await Auth.findOne({ wher: { user_id: userData.user_id, status: 1 } })
        if (!auth) {
            return responseNotFound(res)
        }

        if (!(await auth.CorrectPassword(req.body.password, auth.password))) {
            return responseBadRequest(res, "Invalid Password")
        }

        const token = signToken(userData.user_id)
        return responseSuccess(res, { user: userData, token: token })
    } catch (err) {
        console.log(err)
        return responseBadRequest(res)
    }
}

exports.giveAccess = async (req, res) => {
    try {
        const user = await User.findOne({ where: { user_id: req.body.user_id } })
        if (!user) {
            return responseNotFound(res)
        }

        const auth = await Auth.findOne({ where: { user_id: req.body.user_id } })
        if (!auth) {
            if (req.body.password !== req.body.passwordConfirm) {
                return responseBadRequest(res, "Password is Not Match")
            }

            await Auth.create({
                user_id: req.body.user_id,
                password: req.body.password,
                status: 1
            })
        } else {
            if (auth.status === 0) {
                await auth.update({
                    status: 1
                })
            }
        }

        return responseSuccess(res, user)
    } catch (err) {
        return responseBadRequest(res)
    }
}

exports.removeAccess = async (req, res) => {
    try {
        const auth = await Auth.findOne({ where: { user_id: req.params.id } })

        await auth.update({
            status: 0
        })

        return responseSuccess(res, auth.user_id)
    } catch (err) {
        return responseBadRequest(res)
    }
}