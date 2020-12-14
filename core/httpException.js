class HttpException extends Error{
    constructor(msg="服务器异常",errorCode=10010,status=500,result){
        super(msg)
        this.errorCode=errorCode
        this.status=status
        this.result=result
    }
}
class ParameterException extends HttpException{
    constructor(msg="参数错误",errorCode=10400){
        super(msg,errorCode,400)
    }
}
class NotFundException extends HttpException{
    constructor(msg="资源未找到",errorCode=10404){
        super(msg,errorCode,404)
    }
}
class AuthFailedException extends HttpException{
    constructor(msg="认证失败",errorCode=10401){
        super(msg,errorCode,401)
    }
}
class SuccessException extends HttpException{
    constructor(result,msg="ok",errorCode=10200){
        super(msg,errorCode,200,result)
    }
}
function Success(result=""){
    throw new SuccessException(result)
}
module.exports={
    HttpException,
    Success,
    AuthFailedException,
    ParameterException,
    NotFundException
}