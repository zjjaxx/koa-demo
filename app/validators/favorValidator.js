const Joi=require("joi")

const favorSchame=Joi.object({
    issueId:Joi.number()
        .required()
        .messages({
            "any.required":"期刊ID必填"
        })
})

module.exports=favorSchame