const Router = require("koa-router")
const router = new Router({
    prefix:"/v1/token"//路由前缀
})
router.post("/",async(ctx,next)=>{
    
})

module.exports=router