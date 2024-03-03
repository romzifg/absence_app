const {
    User
} = require('../../models');
const validator = require('validator');
const excel = require('exceljs');
const { generateCode } = require('../../helpers/generateCode');

exports.getUser = async (req, res, next) => {
    try {
        const data = await User.findAll({ where: { deletedAt: null } })

        return res.status(200).json({
            statusCode: 200,
            message: "Success Get Data",
            data: data
        })
    } catch (err) {
        next(err)
    }
}

exports.storeUser = async (req, res, next) => {
    try {
        let code = ""

        code = generateCode()
        if (code === "") {
            res.statusCode = 400;
            throw new Error('Bad Request, Error Generate Code')
        }

        const checkUser = await User.findOne({ where: { code: code } })
        if (checkUser) {
            code = generateCode()
        }

        if (!validator.isEmail(req.body.email) || validator.isEmpty(req.body.email)) {
            res.statusCode = 400;
            throw new Error('Bad Request, Invalid Email')
        }
        if (validator.isEmpty(req.body.name)) {
            res.statusCode = 400;
            throw new Error('Bad Request, Name Cannot Be Empty')
        }

        const data = await User.create({ ...req.body, code: code })
        return res.status(200).json({
            statusCode: 200,
            message: "Success Add Data",
            data: data
        })
    } catch (err) {
        next(err)
    }
}

exports.userBulkCreate = async (req, res, next) => {
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
                res.statusCode = 400;
                throw new Error('Bad Request, Error Generate Code')
            }

            const checkUser = await User.findOne({ where: { code: code } })
            if (checkUser) {
                code = generateCode()
            }

            el.code = code
            el.email = el.email.text
        }))

        const data = await User.bulkCreate(userData)

        return res.status(200).json({
            statusCode: 200,
            message: "Success Bulk Create",
            data: data.length
        })
    } catch (err) {
        next(err)

    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { user_id: req.params.id, deletedAt: null } })
        if (!user) {
            res.statusCode = 404;
            throw new Error('User Not Found')
        }

        await user.update({ ...req.body })
        return res.status(200).json({
            statusCode: 200,
            message: "Success Update Data",
            data: data.user_id
        })
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { user_id: req.params.id, deletedAt: null } })
        if (!user) {
            res.statusCode = 404;
            throw new Error('User Not Found')
        }

        await user.update({ deletedAt: Date.now() })
        return res.status(200).json({
            statusCode: 200,
            message: "Success Delete Data",
            data: data.user_id
        })
    } catch (err) {
        next(err)
    }
}