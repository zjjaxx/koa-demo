const {HttpException} = require("../core/httpException")

const exception=async function(ctx,next){
    try {
        await next()
    } catch (error) {
        if(error instanceof HttpException){
            ctx.body={
                msg:error.message,
                errorCode:error.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status=error.status
        }
       //msg 错误详细描述信息
       //errorCode Status Code 详细错误码
       //requestUrl 当前请求的url
    }
}
module.exports=exception