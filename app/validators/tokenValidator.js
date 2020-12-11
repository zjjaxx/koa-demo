const Joi = require("joi")
const { ParameterException } = require("../../core/httpException")
const User=require("../models/user")
const {loginType}=require("../../config")
//自定义错误消息
//https://www.thinbug.com/q/48720942
const userSchema = Joi.object({
    account: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.base": "账号必须为字符串",
            'any.required': "账号必填",
            'string.min': "账号最小长度为{#limit}",
            "string.max": "账号最大长度为{#limit}",
        }),
        //如果是微信登入等其它方式登入,则不需要密码
    password: Joi.string()
        .pattern(new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$'))
        .messages({
            "string.base": "密码必须为字符串",
            'any.required': "密码必填",
            "string.pattern.base": "密码由数字和字母组成，并且要同时含有数字和字母，且密码长度必须在8至16位"
        }),
        type:Joi.number()
                .required()
                .custom(value=>{
                    if(!Object.values().includes(loginType)){
                        throw ParameterException("登入类型有误")
                    }
                    return value
                })
                .messages({
                    'any.required': "登入类型必填"
                })
       
})

module.exports = userSchema

