const Router = require("koa-router")
const router = new Router({
    prefix:"/v1/user"//路由前缀
})
const {HttpException} = require("../../../core/httpException")

router.post("/register",async(ctx,next)=>{
    
})