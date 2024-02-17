const { generateCode } = require('../helpers/generateCode');
const {
    User
} = require('../models');

exports.getUser = async (req, res) => {
    try {
        const data = await User.findAll({ where: { deletedAt: null } })

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: data
        })
    } catch (err) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Bad Request',
            data: null
        })
    }
}

exports.storeUser = async (req, res) => {
    try {
        let code = ""

        code = generateCode()
        if (code === "") {
            return res.status(400).json({
                statusCode: 400,
                message: 'Bad Request, Error Generate Code',
                data: null
            })
        }

        const checkUser = await User.findOne({ where: { code: code } })
        if (checkUser) {
            code = generateCode()
        }

        const data = await User.create({ ...req.body, code: code })

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: data
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            statusCode: 400,
            message: 'Bad Request',
            data: null
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { user_id: req.params.id, deletedAt: null } })
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Not Found',
                data: null
            })
        }

        await user.update({ ...req.body })

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: user.user_id
        })
    } catch (err) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Bad Request',
            data: null
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { user_id: req.params.id, deletedAt: null } })
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Not Found',
                data: null
            })
        }

        await user.update({ deletedAt: Date.now() })

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: user.user_id
        })
    } catch (err) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Bad Request',
            data: null
        })
    }
}