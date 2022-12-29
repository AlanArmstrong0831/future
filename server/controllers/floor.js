const Joi = require('joi')

const {
    share: ShareModel,
    floor: FloorModel,
    user: UserModel,
    sequelize
  } = require('../models')

  class FloorController {
    // 回复帖子
    static async createReply(ctx) {
        const validator = ctx.validate(ctx.request.body, {
          shareId: Joi.number().required(), // 文章 id
          userId: Joi.number().required(), // 用户 id
          content: Joi.string().required(), // 评论 、回复的内容
        })
    
        if (validator) {
          const { shareId, userId, content } = ctx.request.body
          const user = await UserModel.findOne({ where: { id: userId } })
            if(user.disabledDiscuss) {
              ctx.status = 401
              ctx.response.body = {
                message: '您已被禁言，请文明留言！'
              }
            } else {
            // 添加评论
              await FloorModel.create({ userId, shareId, content })
              const list = await FloorController.fetchDiscussList(shareId)
      
              ctx.body = list
            }
            
          // }
        }
    }

    static async fetchDiscussList(shareId) {
        const data = await ShareModel.findAndCountAll({
          where: { id: shareId },
          attributes: ['id', 'content', 'createdAt'],
          include: [
            {
                model: FloorModel,
                attributes: ['id', 'content', 'createdAt'],
                include: [
                    { model: UserModel, as: 'user', attributes: { exclude: ['updatedAt', 'password'] } }
                ],
                row: true,
                order: [['createdAt', 'ASC']]
            },
            { model: UserModel, as: 'user', attributes: { exclude: ['updatedAt', 'password'] } }
          ],
          row: true,
        })
        return data.rows[0]
    }
  }

  module.exports = FloorController