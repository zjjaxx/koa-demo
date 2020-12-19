const {Model,DataTypes}=require("sequelize")
const db=require("../../core/db")
class UserIssue extends Model{
    
}

UserIssue.init({
    issueId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    userId:DataTypes.INTEGER,
    isFavor:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    sequelize:db,
    modelName:"UserIssue",
    tableName:"userIssue"
})

module.exports=UserIssue