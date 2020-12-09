const Joi = require("joi")
const { ParameterException } = require("../../core/httpException")
const User=require("../models/user")
//自定义错误消息
//https://www.thinbug.com/q/48720942
const userSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.base": "用户名必须为字符串",
            'any.required': "用户名必填",
            'string.min': "用户名最小长度为{#limit}",
            "string.max": "用户名最大长度为{#limit}",
        }),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$'))
        .messages({
            "string.base": "密码必须为字符串",
            'any.required': "密码必填",
            "string.pattern.base": "密码由数字和字母组成，并且要同时含有数字和字母，且密码长度必须在8至16位"
        })
    ,
    //https://github.com/sideway/joi/issues/2147
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({'any.only': '密码不一致'}),
    email: Joi.string()
        .email()
        //https://github.com/sideway/joi/issues/2381
        .external(async (value)=>{
            let user=await User.findOne({where:{
                email:value
            }})
            if(user){
                throw new ParameterException("邮箱已注册")
            }
            return value
        })
        .messages({
            "string.base": "邮箱必须为字符串",
            "string.email": "邮箱格式有误"
        })
       
})

module.exports = userSchema

