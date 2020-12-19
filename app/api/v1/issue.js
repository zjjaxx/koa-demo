const Router = require("koa-router")
const Auth = require("../../../middlewares/auth")
const { issueType } = require("../../../config")
const router = new Router({
    prefix: "/v1/issue"
})
const {Success}=require("../../../core/httpException")
const { validatorCommon } = require("../../../core/common")
const issueSchame = require("../../validators/issueValidator")
const favorSchame=require("../../validators/favorValidator")
const Movie = require("../../models/movie")
const Music = require("../../models/music")
const Sentence = require("../../models/sentence")
const Issue = require("../../models/issue")
const UserIssue=require("../../models/user_issue")

router.post("/addIssue", new Auth().authentication(), async (ctx, next) => {
    const params = ctx.request.body
    let value = await validatorCommon(params, issueSchame)
    let _issue = await Issue.create({type:value.type})
    switch (value.type) {
        case issueType.movieType:
            await Movie.create(Object.assign({},{issueId: _issue.No},value))
            break
        case issueType.musicType:
            await Music.create(Object.assign({},{issueId: _issue.No},value))
            break
        case issueType.sentenceType:
            await Sentence.create(Object.assign({},{issueId: _issue.No},value))
            break
    }
    Success("上传成功")
})
router.post("/favor",new Auth().authentication(),async (ctx,next)=>{
    const params = ctx.request.body
    let value = await validatorCommon(params, favorSchame)
    let userIssue=await UserIssue.findOne({where:{userId:ctx.auth.uid,issueId:value.issueId}})
    if(!userIssue){
        userIssue= await UserIssue.create({userId:ctx.auth.uid,issueId:value.issueId})
    }
    userIssue.isFavor=!userIssue.isFavor
    await userIssue.save()
    Success({isFavor:userIssue.isFavor})
})
router.get("/getLastestIssue",async (ctx,next)=>{
    let token=ctx.headers.authorization&&ctx.headers.authorization.split(" ")[1]||""
    let lastestIssue=await Issue.findOne({
        order:[["No","DESC"]]
    })
    if(!lastestIssue){
        Success()
    }
    let issue_detail=null
    switch(lastestIssue.type){
        case issueType.movieType:
            issue_detail=  await Movie.findOne({where:{issueId:lastestIssue.No}})
            break
        case issueType.musicType:
            issue_detail=await Music.findOne({where:{issueId:lastestIssue.No}})
            break
        case issueType.sentenceType:
            issue_detail=await Sentence.findOne({where:{issueId:lastestIssue.No}})
            break
    }
    let isFavor=false
    if(token){
        let user=new Auth().tokenIsValid(token)
        let userIssue=await UserIssue.findOne({where:{userId:user.uid,issueId:lastestIssue.No}})
        isFavor=userIssue?userIssue.isFavor:false
    }
    Success({
        issueId:lastestIssue.No,
        type:lastestIssue.type,
        love:lastestIssue.love,
        img:issue_detail.img,
        desc:issue_detail.desc,
        title:issue_detail.title,
        musicUrl:issue_detail.musicUrl,
        isFavor
    })
})
module.exports=router