const { Sequelize } = require('sequelize');
const {
    database: {
        dbName,
        user,
        password,
        host,
        port
    } } = require("../config")
const sequelize = new Sequelize(dbName, user, password, {
    dialect: "mysql",
    host,
    port,
    logging: true,
    timezone: "+08:00",//设置时区
    define: {//全局定义
        timestamps: true,
    } 
})
//调用一个异步函数(返回一个Promise)model.sync(options)
sequelize.sync({ force: false })
module.exports = sequelize