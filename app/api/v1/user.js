
const Router = require("koa-router")
const router = new Router({
    prefix:"/v1/user"//路由前缀
})

const userSchema=require("../../validators/userValidator")
const {validatorCommon}=require("../../../core/common")
const User=require("../../models/user")
const { Success } = require("../../../core/httpException")

router.post("/register",async(ctx,next)=>{
    const params=ctx.request.body
    let  value=await validatorCommon(params,userSchema)
    await User.create(value)
    Success
})


module.exports = router