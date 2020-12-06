const Router=require("koa-router")
const router=new Router()

router.get("/v1/classic",(ctx,next)=>{
    ctx.body={
        name:"classic"
    }
})

module.exports=router