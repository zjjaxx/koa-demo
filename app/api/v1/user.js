const bcryptjs=require("bcryptjs")
const Router = require("koa-router")
const router = new Router({
    prefix:"/v1/user"//路由前缀
})
const {ParameterException} = require("../../../core/httpException")
const userSchema=require("../../validators/userValidator")

const User=require("../../models/user")

router.post("/register",async(ctx,next)=>{
    const params=ctx.request.body
    let  value=null
    try {
        value= await userSchema.validateAsync(params);
    }
    catch (err) { 
        if(err instanceof ParameterException){
            throw err
        }
        throw new ParameterException(err.details[0].message)
    }
    const salt=bcryptjs.genSaltSync(10)
    //10 计算机生成salt 的成本 ，成本越高，安全性越高 ,salt 作用 即使密码相同，加密生成的值也不同
    const psw_hash=bcryptjs.hashSync(value.password,salt)
    value.password=psw_hash
    User.create(value)
})

module.exports = router