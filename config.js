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
        expiresIn:60*60//过期时间
    }
}