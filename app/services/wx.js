const axios = require("axios")
const { mini_program: { AppSecret, AppId,loginUrl } } = require("../../config")
const { AuthFailedException } = require("../../core/httpException")
class WXManager {
    static async codeToToken(code) {
        let res = await axios.get(loginUrl,
            { params: { appid: AppId, secret: AppSecret, js_code: code, grant_type: "authorization_code" } }
        )
        console.log("res",res.data.errcode)
        if(res.status!==200){
            throw new AuthFailedException("openid 获取失败")
        }
        else if(res.data.errcode&&res.data.errcode!=0){
            throw new AuthFailedException("openid 获取失败--"+res.data.errmsg)
        }
        return res.data.openid
    }
}
module.exports=WXManager