
const Router = require("koa-router")
const router = new Router({
    prefix:"/v1/user"//路由前缀
})
const {ParameterException,Success} = require("../../../core/httpException")
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
    await User.create(value)
    Success()
})


module.exports = router