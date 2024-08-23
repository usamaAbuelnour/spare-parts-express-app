const Joi = require("joi");

const accountValidationSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(8),
    role: Joi.string().optional().valid("user", "admin"),
});

module.exports = accountValidationSchema;
