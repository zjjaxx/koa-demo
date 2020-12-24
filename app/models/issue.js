const sequelize = require("../../core/db")
const { Model, DataTypes,Op } = require("sequelize")
const Auth = require("../../middlewares/auth")
const { issueType } = require("../../config")
const Movie = require("../models/movie")
const Music = require("../models/music")
const Sentence = require("../models/sentence")
const { Success,HttpException } = require("../../core/httpException")
const UserIssue = require("../models/user_issue")

let lastIssueId=0
class Issue extends Model{
    static async addIssue(value){
        let _issue = await Issue.create({ type: value.type })
        lastIssueId=_issue.No
        switch (value.type) {
            case issueType.movieType:
                await Movie.create(Object.assign({}, { issueId: _issue.No }, value))
                break
            case issueType.musicType:
                await Music.create(Object.assign({}, { issueId: _issue.No }, value))
                break
            case issueType.sentenceType:
                await Sentence.create(Object.assign({}, { issueId: _issue.No }, value))
                break
        }
    }
    static async favor(ctx,value){
        let userIssue = await UserIssue.findOne({ where: { userId: ctx.auth.uid, issueId: value.issueId } })
        if (!userIssue) {
            //数据库事务，可以保证数据的一致性
            // 下面2个步骤要执行就一起执行，如果有一个失败，另一个也会撤销
            let _issue = await Issue.findOne({ where: { No: value.issueId } })
            try {
                const result = await sequelize.transaction(async (t) => {
                    userIssue = await UserIssue.create({ userId: ctx.auth.uid, issueId: value.issueId}, {transaction: t})
                    await _issue.increment("love",{by:1,transaction: t })
                })
            }
            catch (error) {
                console.log("error auto callback", error)
                throw new HttpException("点赞异常，数据回滚")
            }
        }
        else {
            let _issue = await Issue.findOne({ where: { No: value.issueId } })
            try {
                const result = await sequelize.transaction(async (t) => {
                    //force:true 强制删除 删除数据
                    //force:false 软删除 在表里添加deleteAt数据
                    await userIssue.destroy({force:true, transaction: t })
                    await _issue.decrement("love",{by:1,transaction: t })
                    userIssue = null
                })
            }
            catch (error) {
                console.log("error auto callback", error)
                throw new HttpException("取消点赞异常，数据回滚")
            }
    
        }
        return userIssue
    }
    static async issueDetail(ctx,issue){
        let token = ctx.headers.authorization && ctx.headers.authorization.split(" ")[1] || ""
        let issue_detail = null
        switch (issue.type) {
            case issueType.movieType:
                issue_detail = await Movie.findOne({ where: { issueId: issue.No } })
                break
            case issueType.musicType:
                issue_detail = await Music.findOne({ where: { issueId: issue.No } })
                break
            case issueType.sentenceType:
                issue_detail = await Sentence.findOne({ where: { issueId: issue.No } })
                break
        }
        let isFavor = false
        if (token) {
            let user = new Auth().tokenIsValid(token)
            let userIssue = await UserIssue.findOne({ where: { userId: user.uid, issueId: issue.No } })
            isFavor = userIssue ? true : false
        }
        return {
            issueId: issue.No,
            type: issue.type,
            love: issue.love,
            img: issue_detail.img,
            desc: issue_detail.desc,
            title: issue_detail.title,
            musicUrl: issue_detail.musicUrl,
            isFavor,
            hasPreIssue:issue.No>1,
            hasNextIssue:issue.No<lastIssueId
        }
    }
    static async getLatestIssue(ctx){
        let lastestIssue = await Issue.findOne({
            order: [["No", "DESC"]]
        })
        if (!lastestIssue) {
            Success()
        }
        let result= await Issue.issueDetail(ctx,lastestIssue)
        return result
    }
    static async getNextIssue(ctx,value){
        let lastestIssue = await Issue.findOne({where:{No:value.currentIssueId+1}})
        let result= await Issue.issueDetail(ctx,lastestIssue)
        return result
    }
    static async getPreIssue(ctx,value){
        let lastestIssue = await Issue.findOne({where:{No:value.currentIssueId-1}})
        let result= await Issue.issueDetail(ctx,lastestIssue)
        return result
    }
    static async getIssueTypeDetail(key,value){
        let issueDetailList = null
        let idList=value.map(item=>item.issueId)
        switch (key) {
            case issueType.movieType:
                 //使用In查询数据库，防止查询次数不可控
                issueDetailList = await Movie.findAll({ where: { issueId: {[Op.in]:idList} } })
                break
            case issueType.musicType:
                issueDetailList = await Music.findAll({ where: { issueId: {[Op.in]:idList}} })
                break
            case issueType.sentenceType:
                issueDetailList = await Sentence.findAll({ where: { issueId:{[Op.in]:idList}} })
                break
        }
        return issueDetailList.map(issue=>{
            let valueItem= value.map(item=>item.issueId==issue.issueId)
            return {
                issueId: issue.issueId,
                type: issue.type,
                love: valueItem.love,
                img: issue.img,
                desc: issue.desc,
                title: issue.title,
                musicUrl: issue.musicUrl,
                isFavor:true,
                hasPreIssue:issue.issueId>1,
                hasNextIssue:issue.issueId<lastIssueId
            }
        })

    }
    static async getFavorList(ctx){
       let uid= ctx.auth.uid
       let userIssueList=await UserIssue.findAll({where:{userId:uid}})
       let idList=userIssueList.map(item=>item.issueId)
       let issueList=await Issue.findAll({where:{No:{[Op.in]:idList}}})
       let issueTotal={
        [issueType.movieType]:[],
        [issueType.musicType]:[],
        [issueType.sentenceType]:[]
       }
       issueList.forEach(issue=>{
            issueTotal[issue.type].push({issueId:issue.No,love:issue.love})
       })
       let result=[]
       for(let key in issueTotal){
          let detail=await Issue.getIssueTypeDetail(parseInt(key),issueTotal[key])
          result=[...result,...detail]
       }
       return result
    }
}
Issue.init({
    No:{
        type: DataTypes.INTEGER,
        primaryKey: true,//主键 唯一标识
        autoIncrement: true,//自增 会暴露用户编号 
    },
    type:DataTypes.INTEGER,
    love:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},{
    //timestamps: false,//局部定义
    sequelize: sequelize, // 我们需要传递连接实例
    modelName: 'Issue', // 我们需要选择模型名称
    tableName: "issue"//表名
})

module.exports=Issue