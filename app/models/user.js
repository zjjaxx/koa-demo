const db = require("../../core/db")
const { Model, DataTypes } = require("sequelize")

class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,//主键 唯一标识
        autoIncrement: true,//自增 会暴露用户编号 
    },
    nickname: DataTypes.STRING,//默认长度64
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    openid: {
        type: DataTypes.STRING(64),
        unique: true,//唯一
    }
}, {
    //timestamps: false,//局部定义
    sequelize: db, // 我们需要传递连接实例
    modelName: 'User', // 我们需要选择模型名称
    tableName:"user"//表名
}) 