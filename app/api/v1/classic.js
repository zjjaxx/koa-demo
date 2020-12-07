const Router=require("koa-router")
const { ParameterException } = require("../../../core/httpException")
const router=new Router()

router.get("/v1/classic",(ctx,next)=>{
    const name=ctx.query.name
    if(!name){
        throw new ParameterException()
    }
    ctx.body={
        name:"classic"
    }
})

module.exports=router