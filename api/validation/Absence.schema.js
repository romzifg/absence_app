const Joi = require('joi')

const StoreAbsenceSchema = Joi.object({
    code: Joi.string().required(),
})

module.exports = {
    StoreAbsenceSchema
}