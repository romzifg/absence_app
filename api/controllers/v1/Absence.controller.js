const {
    User,
    Absence
} = require('../../models');
const dayjs = require('dayjs')
const excelJS = require("exceljs");

exports.getAbsence = async (req, res, next) => {
    try {
        const data = await Absence.findAll({
            include: [
                { model: User, as: 'user' }
            ]
        })

        return res.status(200).json({
            statusCode: 200,
            message: 'Success',
            data: data
        })
    } catch (err) {
        next(err)
    }
}

exports.storeAbsence = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { code: req.body.code } })
        if (!user) {
            res.statusCode = 404
            throw new Error('User Not Registered')
        }

        const data = await Absence.create({
            user_id: user.user_id,
            absence_date: dayjs(req.body.absence_date).format('YYYY-MM-DD'),
            absence_time: dayjs(req.body.absence_time).format('HH:mm:ss')
        })

        return res.status(200).json({
            statusCode: 200,
            message: 'Absence Success',
            data: data
        })
    } catch (err) {
        next(err)
    }
}

exports.generateReport = async (req, res, next) => {
    try {
        const data = await Absence.findAll({
            include: [
                { model: User, as: 'user' }
            ]
        })

        const workbook = new excelJS.Workbook()
        const worksheet = workbook.addWorksheet("Absence Report")
        const filename = `Absence_report-${dayjs(Date.now()).format("DDMMYYYY")}.xlsx`

        worksheet.columns = [
            { header: "No", key: "no", width: 10 },
            { header: "Name", key: "name", width: 30 },
            { header: "Absence Date", key: "absence_date", width: 30 },
            { header: "Absence Time", key: "absence_time", width: 30 },
        ];

        let counter = 1;
        data.forEach((el) => {
            worksheet.addRow({
                no: counter,
                name: el.user.name,
                absence_date: dayjs(el.absence_date).format("DD MMMM YYYY"),
                absence_time: el.absence_time
            });
            counter++;
        });

        const pathFile = `${req.protocol}://${req.get('host')}/public/${filename}`

        await workbook.xlsx.writeFile(`${__dirname}/../public/${filename}`)
            .then(() => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Success',
                    path: pathFile,
                });
            }).catch((err) => {
                res.statusCode = 400
                throw new Error(err)
            });
    } catch (err) {
        next(err)
    }
}