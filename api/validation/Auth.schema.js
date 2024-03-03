const Joi = require('joi');

const AuthLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
})

const GiveAccessSchema = Joi.object({
    user_id: Joi.required(),
    password: Joi.string().required().min(8),
    passwordConfirm: Joi.string().required(),
})

module.exports = {
    AuthLoginSchema,
    GiveAccessSchema
}