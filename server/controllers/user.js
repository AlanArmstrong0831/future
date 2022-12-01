const Joi = require('joi')
const { comparePassword, encrypt } = require('../utils/bcrypt')
const { user: UserModel } = require('../models')
const { createToken } = require('../utils/token')
class UserController {
    // 登录
  static async login(ctx) {
    const { code } = ctx.request.body
    if (code) {
      await UserController.githubLogin(ctx, code)
    } else {
      await UserController.defaultLogin(ctx)
    }
  }

  // 站内用户登录
  static async defaultLogin(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      account: Joi.string().required(),
      password: Joi.string()
    })
    if (validator) {
      const { account, password } = ctx.request.body

      const user = await UserModel.findOne({
        where: {
          // $or: { email: account, username: account }
          username: account
        }
      })

      if (!user) {
        // ctx.client(403, '用户不存在')
        ctx.throw(403, '用户不存在')
      } else {
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
          // ctx.client(403, '密码不正确')
          ctx.throw(403, '密码不正确')
        } else {
          const { id, role } = user
          const token = createToken({ username: user.username, userId: id, role }) // 生成 token
          // ctx.client(200, '登录成功', { username: user.username, role, userId: id, token })
          ctx.body = { username: user.username, role, userId: id, token }
        }
      }
    }
  }

  // 注册
  static async register(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string()
        .email()
        .required()
    })

    if (validator) {
      const { username, password, email } = ctx.request.body
      const result = await UserModel.findOne({ where: { email } })
      if (result) {
        // ctx.client(403, '邮箱已被注册')
        ctx.throw(403, '邮箱已被注册')
      } else {
        const user = await UserModel.findOne({ where: { username } })
        if (user && !user.github) {
          ctx.throw(403, '用户名已被占用')
        } else {
          const saltPassword = await encrypt(password)
          await UserModel.create({ username, password: saltPassword, email })
          // ctx.client(200, '注册成功')
          ctx.status = 204
        }
      }
    }
  }
}

module.exports = UserController