const jwt = require('jsonwebtoken')
const { responseSuccess, responseBadRequest } = require('../helpers/response');
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
        if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
            return responseBadRequest(res, "Invalid Email or Password")
        }

        const token = signToken(user.id)
        return responseSuccess(res, token)
    } catch (err) {
        responseBadRequest(res)
    }
}