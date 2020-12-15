const Router=require("koa-router")
const { ParameterException } = require("../../../core/httpException")
const router=new Router()
const Auth=require("../../../middlewares/auth")
router.get("/v1/classic",new Auth().authentication(),(ctx,next)=>{
    const name=ctx.query.name
    if(!name){
        throw new ParameterException()
    }
    ctx.body={
        name:"classic"
    }
})

module.exports=router 