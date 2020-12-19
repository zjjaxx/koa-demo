const Joi = require("joi")
const {issueType}=require("../../config")
const { ParameterException } = require("../../core/httpException")
const issueSchame=Joi.object({
    img: Joi.string()
        .required()
        .messages({
            "any.required": "图片必填"
        }),
    musicUrl:Joi.string(),
    desc: Joi.string(),
    type: Joi.number()
        .required()
        .custom(value=>{
            if(!Object.values(issueType).includes(value)){
                throw new ParameterException("type参数有误")
            }
            return value                 
        })
        .messages({
            "any.required": "类型必填"
        }),
    url:Joi.string(),
    title: Joi.string()
        .required()
        .messages({
            "any.required": "标题必填"
        }),
})

module.exports=issueSchame