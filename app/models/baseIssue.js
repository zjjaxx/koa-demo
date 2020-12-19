
const { DataTypes } = require("sequelize")

const baseIssue={
    img:DataTypes.STRING,
    issueId:{
        type:DataTypes.INTEGER,
        primaryKey: true,//主键 唯一标识
    },
    desc:DataTypes.STRING,
    type:DataTypes.INTEGER,
    title:DataTypes.STRING
}

module.exports=baseIssue