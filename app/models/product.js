const db=require("../../core/db")
const {DataTypes,Model}=require("sequelize")

class Product extends Model{

}

Product.init({
    productName:DataTypes.STRING,
    productId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
},{
    sequelize:db,
    tableName:"products",
    modelName:"Pruduct"
})
module.exports=Product