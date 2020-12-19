const db = require("../../core/db")
const { Model, DataTypes } = require("sequelize")

class Issue extends Model{
    
}
Issue.init({
    No:{
        type: DataTypes.INTEGER,
        primaryKey: true,//主键 唯一标识
        autoIncrement: true,//自增 会暴露用户编号 
    },
    type:DataTypes.INTEGER,
    love:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},{
    //timestamps: false,//局部定义
    sequelize: db, // 我们需要传递连接实例
    modelName: 'Issue', // 我们需要选择模型名称
    tableName: "issue"//表名
})

module.exports=Issue