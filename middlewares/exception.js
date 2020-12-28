const { HttpException } = require("../core/httpException")

const exception = async function (ctx, next) {
    try {
        await next()
    } catch (error) {
        const isHttpException=error instanceof HttpException
        //如果是开发环境并且是未知异常则抛出异常
        if (global.env == "dev"&&!isHttpException) {
            throw error
        }
        if (isHttpException) {
            ctx.body = {
                msg: error.message,
                errorCode: error.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`,
                result:error.result
            }
            ctx.status = error.status
        }
        //msg 错误详细描述信息
        //errorCode Status Code 详细错误码
        //requestUrl 当前请求的url
        else {
            ctx.body = {
                msg: "未知异常",
                errorCode: 999,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }

    }
}
module.exports = exception