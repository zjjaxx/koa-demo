const { ParameterException } = require("./httpException");
const jwt = require("jsonwebtoken")
const { security: { secretKey,expiresIn } } = require("../config")
module.exports = {
    validatorCommon: async (params, schema) => {
        let value = null
        try {
            value = await schema.validateAsync(params);
        }
        catch (err) {
            if (err instanceof ParameterException) {
                throw err
            }
            throw new ParameterException(err.details[0].message)
        }
        return value
    },
    //scope 权限划分，普通用户8 管理员16
    generateToken: (uid, scope) => {
        return jwt.sign({
            uid,
            scope
        }, secretKey, {
            expiresIn
        })
    }
}