const {Model,DataTypes}=require("sequelize")
const sequelize=require("../../core/db")

class UserIssue extends Model{
 
}

UserIssue.init({
    issueId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    userId:DataTypes.INTEGER
},{
    sequelize:sequelize,
    modelName:"UserIssue",
    tableName:"userIssue"
})

module.exports=UserIssue