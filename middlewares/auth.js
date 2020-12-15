const {ForbidenException}=require("../core/httpException")
const jwt=require("jsonwebtoken")
const config=require("../config")
class Auth{
    constructor(level=1){
        this.level=level
        Auth.USER=8
        Auth.Admin=16
        Auth.SUPER_ADMIN=32
    }
    authentication(){
        return async (ctx,next)=>{
            const token=ctx.headers.authorization&&ctx.headers.authorization.split(" ")[1]||""
            if(!token){
                throw new ForbidenException()
            }
            let decode=null
            try {
                decode=jwt.verify(token,config.security.secretKey)
            } catch (error) {
                if(error.name="TokenExpiredError"){
                    throw new ForbidenException("token已过期")
                }
                throw new ForbidenException("token不合法")
            }
            if(decode.scope<this.level){
                throw new ForbidenException("权限不足")
            }
            ctx.auth={
                uid:decode.uid,
                scope:decode.scope
            }
            await next()
        }
     
    }
}
module.exports=Auth