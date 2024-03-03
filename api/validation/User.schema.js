const Joi = require('joi');

const StoreUserSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required()
})


module.exports = {
    StoreUserSchema,
}