const {
    User,
    Auth
} = require('../../models');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.login = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.statusCode = 400;
            throw new Error('Error Validation, Email or Password cannot be empty')
        }

        const userData = await User.findOne({ where: { email: req.body.email } })
        if (!userData) {
            res.statusCode = 400;
            throw new Error('Invalid Email')
        }
        const auth = await Auth.findOne({ wher: { user_id: userData.user_id, status: 1 } })
        if (!auth) {
            res.statusCode = 404;
            throw new Error('User Not Found')
        }

        if (!(await auth.CorrectPassword(req.body.password, auth.password))) {
            res.statusCode = 400;
            throw new Error('Invalid Password')
        }

        const token = signToken(userData.user_id)
        return res.status(200).json({
            statusCode: 200,
            message: 'Login Success',
            data: { user: userData, token: token }
        })
    } catch (err) {
        next(err)
    }
}

exports.giveAccess = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { user_id: req.body.user_id } })
        if (!user) {
            res.statusCode = 404;
            throw new Error('User Not Found')
        }

        const auth = await Auth.findOne({ where: { user_id: req.body.user_id } })
        if (!auth) {
            if (req.body.password !== req.body.passwordConfirm) {
                res.statusCode = 400;
                throw new Error('Password is Not Match')
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

        return res.status(200).json({
            statusCode: 200,
            message: 'Success Give Access',
            data: user
        })
    } catch (err) {
        next(err)
    }
}

exports.removeAccess = async (req, res) => {
    try {
        const auth = await Auth.findOne({ where: { user_id: req.params.id } })
        if (!auth) {
            res.statusCode = 404;
            throw new Error('User Not Found')
        }

        await auth.update({
            status: 0
        })

        return res.status(200).json({
            statusCode: 200,
            message: 'Success Remove Access',
            data: auth.user_id
        })
    } catch (err) {
        next(err)
    }
}