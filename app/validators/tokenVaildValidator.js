const Joi = require("joi")
const tokenValidSchema = Joi.object({
    token: Joi.string()
            .required()
            .messages({
                'any.required': "token必填",
            })
})

module.exports=tokenValidSchema