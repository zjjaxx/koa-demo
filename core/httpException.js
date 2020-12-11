class HttpException extends Error{
    constructor(msg="服务器异常",errorCode=10010,status=500){
        super(msg)
        this.errorCode=errorCode
        this.status=status
    }
}
class ParameterException extends HttpException{
    constructor(msg="参数错误",errorCode=10001){
        super(msg,errorCode,400)
    }
}
class NotFundException extends HttpException{
    constructor(msg="资源未找到",errorCode=10004){
        super(msg,errorCode,404)
    }
}
class SuccessException extends HttpException{
    constructor(msg="ok",errorCode=10008){
        super(msg,errorCode,200)
    }
}
function Success(){
    throw new SuccessException()
}
module.exports={
    HttpException,
    Success,
    ParameterException,
    NotFundException
}