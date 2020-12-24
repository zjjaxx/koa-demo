const Router = require("koa-router")
const Auth = require("../../../middlewares/auth")

const router = new Router({
    prefix: "/v1/issue"
})
const { Success } = require("../../../core/httpException")
const { validatorCommon } = require("../../../core/common")
const issueSchame = require("../../validators/issueValidator")
const favorSchame = require("../../validators/favorValidator")
const issuePageSchame=require("../../validators/issuePageValidator")
const Issue = require("../../models/issue")

router.post("/addIssue", new Auth().authentication(), async (ctx, next) => {
    const params = ctx.request.body
    let value = await validatorCommon(params, issueSchame)
    await Issue.addIssue(value)
    Success("上传成功")
})
router.post("/favor", new Auth().authentication(), async (ctx, next) => {
    const params = ctx.request.body
    let value = await validatorCommon(params, favorSchame)
    let userIssue = await Issue.favor(ctx, value)
    Success({ isFavor: !!userIssue })
})
router.get("/getLastestIssue", async (ctx, next) => {
    let latestIssue = await Issue.getLatestIssue(ctx)
    Success(latestIssue)
})
router.get("/getNextIssue",async (ctx,next)=>{
    let params=ctx.query
    let value=await validatorCommon(params,issuePageSchame)
    let nextIssue = await Issue.getNextIssue(ctx,value)
    Success(nextIssue)
})
router.get("/getPreIssue",async (ctx,next)=>{
    let params=ctx.query
    let value=await validatorCommon(params,issuePageSchame)
    let preIssue = await Issue.getPreIssue(ctx,value)
    Success(preIssue)
})
router.get("/getFavorList",new Auth().authentication(),async (ctx,next)=>{
     let favorList=await Issue.getFavorList(ctx)
     Success(favorList)
})
module.exports = router