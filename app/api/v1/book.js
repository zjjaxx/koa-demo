const Router = require("koa-router")
const router = new Router()
const {HttpException} = require("../../../core/httpException")

router.get("/v1/book", (ctx, next) => {
    ctx.body = {
        name: "book"
    }
})
router.post("/v1/book/:id", (ctx, next) => {
    const id = ctx.params.id
    const postBody = ctx.request.body
    const a = Math.random()
    if (a > 0.5) {
        const error = new HttpException("随机错误",10010,500)
        throw error
    }
    ctx.body = { id, postBody }
})

module.exports = router