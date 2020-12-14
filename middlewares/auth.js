class Auth{
    constructor(){
    }
    async authentication(ctx,next){
        const token=ctx.headers.authorization&&ctx.headers.authorization.split(" ")[1]||""
        console.log("token is",token)
        await next()
    }
}
module.exports=Auth