const db=require("../../core/db")
const {Model,DataTypes}=require("sequelize")
const baseIssue=require("./baseIssue")
class Sentence extends Model{}

Sentence.init(baseIssue,{
    sequelize:db,
    modelName:"Sentence",
    tableName:"sentence"
})      
module.exports=Sentence                                                                                                                                                                                                                                                                                                                                        