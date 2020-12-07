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
module.exports={
    HttpException,
    ParameterException
}