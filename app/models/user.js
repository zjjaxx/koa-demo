const bcryptjs = require("bcryptjs")
const db = require("../../core/db")
const { Model, DataTypes } = require("sequelize")
const { AuthFailedException } = require("../../core/httpException")

class User extends Model {
    static async verifyEmailPassword(email, password="") {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new AuthFailedException("用户不存在")
        }
        let isCorrect = bcryptjs.compareSync(password, user.password)
        if (!isCorrect) {
            throw new AuthFailedException("用户密码错误")
        }
        return user
    }
    static async getOpenidUser(openid){
        const user=await User.findOne({
            where:{
                openid
            }
        })
        return user
    }
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,//主键 唯一标识
        autoIncrement: true,//自增 会暴露用户编号 
    },
    username: DataTypes.STRING,//默认长度64
    email: {
        type: DataTypes.STRING,
        unique: true,//唯一
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            const salt = bcryptjs.genSaltSync(10)
            //10 计算机生成salt 的成本 ，成本越高，安全性越高 ,salt 作用 即使密码相同，加密生成的值也不同
            const psw_hash = bcryptjs.hashSync(value, salt)
            this.setDataValue("password", psw_hash)
        }
    },
    openid: {
        type: DataTypes.STRING(64),
        unique: true,//唯一
    }
}, {
    //timestamps: false,//局部定义
    sequelize: db, // 我们需要传递连接实例
    modelName: 'User', // 我们需要选择模型名称
    tableName: "user"//表名
})

module.exports = User