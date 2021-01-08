const db=require("../../core/db")
const {DataTypes,Model}=require("sequelize")

class Cart extends Model{

}

Cart.init({
    productId:DataTypes.INTEGER,
    uid:DataTypes.INTEGER
},{
    sequelize:db,
    tableName:"carts",
    modelName:"Cart"
})
module.exports=Cart