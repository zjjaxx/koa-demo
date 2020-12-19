const db=require("../../core/db")
const {Model,DataTypes}=require("sequelize")
const baseIssue=require("./baseIssue")
class Movie extends Model{}

Movie.init(baseIssue,{
    sequelize:db,
    modelName:"Movie",
    tableName:"movie"
})      
module.exports=Movie                                                                                                                                                                                                                                                                                                                                        