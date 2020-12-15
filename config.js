module.exports={
    database:{
        dbName:"island",
        host:"localhost",
        port:3306,
        user:"zjj",
        password:"123456jia"
    },
    loginType:{
        USER_MINI_PROGRAM:100,//小程序登入
        USER_EMAIL:101,
        USER_PHONE:102
    },
    security:{
        secretKey:"mH5D6AUSaqBs5tiv",
        expiresIn:"2 days"//过期时间
    },
    mini_program:{
        AppSecret: "0a07b15f52e97108efe6e43c6dbe77ad",
        AppId:"wx5a3636c9ef956db1",
        loginUrl:"https://api.weixin.qq.com/sns/jscode2session"
    }
}