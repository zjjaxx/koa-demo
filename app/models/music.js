const db=require("../../core/db")
const {Model,DataTypes}=require("sequelize")
const baseIssue=require("./baseIssue")
class Music extends Model{}

Music.init(Object.assign({},{musicUrl:DataTypes.STRING},baseIssue),{
    sequelize:db,
    modelName:"Music",
    tableName:"music"
})   
module.exports=Music                                                                                                                                                                                                                                                                                                                                           