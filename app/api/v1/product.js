// const Router=require("koa-router")
// const Auth = require("../../../middlewares/auth")
// const Product = require("../../models/product")
// const User=require("../../models/user")
// const Cart=require("../../models/cart")
// const { Success } = require("../../../core/httpException")
// const router=new Router({ prefix: "/v1/product"})
// Product.belongsToMany(User,{through:Cart})
// User.belongsToMany(Product,{through:Cart})
// router.get("/getCartProduct",new Auth().authentication(),async (ctx,next)=>{
//     const uid=ctx.auth.uid

// })
// router.post("/addProductToCart",new Auth().authentication(),async (ctx,next)=>{
//     const uid=ctx.auth.uid
//     const product=ctx.request.body
//     let user=await User.findOne({where:{id:uid}})
//     await user.addProduct(product,{through:{








//         productId:product.id,
//         uid
//     }})
//     Success()
    
// })
// module.exports=router