const Joi=require("joi")

const issuePageSchame=Joi.object({
    currentIssueId:Joi.number()
        .required()
        .messages({
            "any.required":"currentIssueId必填"
        })
})

module.exports=issuePageSchame