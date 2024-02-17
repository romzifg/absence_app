const {
    User
} = require('../models');

exports.getUser = async (req, res) => {
    try {
        const data = await User.findAll()

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
        const data = await User.create({ ...req.body })

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

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { user_id: req.params.id } })
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
        const user = await User.findOne({ where: { user_id: req.params.id } })
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