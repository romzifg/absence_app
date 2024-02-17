const {
    User
} = require('../models');
const validator = require('validator');
const excel = require('exceljs');
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

exports.userBulkCreate = async (req, res) => {
    try {
        const filepath = req.body.path.replace(`${req.protocol}://${req.get('host')}`, "")
        const path = `${__dirname}/..${filepath}`

        const workbook = new excel.Workbook();
        await workbook.xlsx.readFile(path);
        let userData = [];
        workbook.worksheets.forEach(function (sheet) {
            // read first row as data keys
            let firstRow = sheet.getRow(1);
            if (!firstRow.cellCount) return;
            let keys = firstRow.values;
            sheet.eachRow((row, rowNumber) => {
                if (rowNumber == 1) return;
                let values = row.values
                let obj = {};
                for (let i = 1; i < keys.length; i++) {
                    obj[keys[i]] = values[i];
                }
                userData.push(obj);
            })

        });

        await Promise.all(userData.map(async (el) => {
            let code = ""

            code = generateCode()
            if (code === "") {
                return responseBadRequest(res, "Bad Request, Error Generate Code")
            }

            const checkUser = await User.findOne({ where: { code: code } })
            if (checkUser) {
                code = generateCode()
            }

            el.code = code
            el.email = el.email.text
        }))

        const data = await User.bulkCreate(userData)

        return responseSuccess(res, data.length)
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