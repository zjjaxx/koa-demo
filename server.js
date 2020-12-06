const koa=require("koa")
const app=new koa()
const path=require("path")
const InitManager=require("./core/init")

InitManager.initCore(app)
InitManager.initUseRouters(path.resolve(__dirname,"./app/api"))

app.listen(3000,()=>{
    console.log("listen")
})