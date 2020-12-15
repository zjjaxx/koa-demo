const Router = require("koa-router")
const tokenSchema = require("../../validators/tokenValidator")
const { validatorCommon, generateToken } = require("../../../core/common")
const { Success } = require("../../../core/httpException")
const { loginType } = require("../../../config")
const User = require("../../models/user")
const Auth = require("../../../middlewares/auth")
const WXManager=require("../../services/wx")
const router = new Router({
    prefix: "/v1/token"//路由前缀
})
router.post("/login", async (ctx, next) => {
    const params = ctx.request.body
    let value = await validatorCommon(params, tokenSchema)
    let token=null
    switch (value.type) {
        case loginType.USER_EMAIL:
            token=await emailLoginVerify(value.account,value.password)
            break
        case loginType.USER_MINI_PROGRAM:
            token=await miniLoginVerify(value.account)
            break
        case loginType.USER_PHONE:
            break
    }
    Success({token})
})
const emailLoginVerify=async (account,password)=>{
    let user=await User.verifyEmailPassword(account,password)
    return generateToken(user.id,Auth.USER)
}
const miniLoginVerify=async (code)=>{
    let openid= await WXManager.codeToToken(code)
    let user=await User.getOpenidUser(openid)
    if(!user){
        user=await User.create({
            account:code,
            openid
        })
    }
    return generateToken(user.id,Auth.USER)
}

module.exports = router