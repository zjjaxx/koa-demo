const requireDirectory=require("require-directory")
const Router=require("koa-router")
class InitManager{
    static initCore(app){
        InitManager.app=app
    }
    static initUseRouters(router){
        requireDirectory(module,router,{visit:module=>{
            if(module instanceof Router){
                InitManager.app.use(module.routes())
            }
        }})
    }
}

module.exports=InitManager