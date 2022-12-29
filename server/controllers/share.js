const Joi = require('joi')

const {
    share: ShareModel,
    floor: FloorModel,
    user: UserModel,
    sequelize
  } = require('../models')


  class ShareController {

    // 创建帖子
    static async create(ctx) {
        const validator = ctx.validate(ctx.request.body, {
            userId: Joi.number().required(),
            title: Joi.string().required(),
            content: Joi.string(),
        })

        if (validator) {
            const { title, content, userId } = ctx.request.body
            const result = await ShareModel.findOne({ where: { title } })
        if (result) {
            ctx.throw(403, '创建失败，该标题已存在！')
        } else {
            const data = await ShareModel.create(
                { title, content, userId, },
            )
            ctx.body = data
        }
        }
    }

    // 获取帖子列表
    static async getList(ctx) {
        const validator = ctx.validate(ctx.query, {
            page: Joi.string(),
            pageSize: Joi.number(),
            keyword: Joi.string().allow(''), // 关键字查询
            preview: Joi.number(),
            order: Joi.string()
        })

        if (validator) {
        const { page = 1, pageSize = 10, preview = 1, keyword = '', tag, category, order } = ctx.query

        let shareOrder = [['createdAt', 'DESC']]
        if (order) {
            shareOrder = [order.split(' ')]
        }

        const data = await ShareModel.findAndCountAll({
            where: {
            id: {
                $not: -1 // 过滤关于页面的副本
            },
            $or: {
                title: {
                    $like: `%${keyword}%`
                },
                content: {
                    $like: `%${keyword}%`
                }
            }
            },
            include: [
                {
                    model: FloorModel,
                    attributes: ['id', 'content', 'createdAt'],
                    include: [
                        { model: UserModel, as: 'user', attributes: { exclude: ['updatedAt', 'password'] } }
                    ],
                    row: true
                },
                { model: UserModel, as: 'user', attributes: { exclude: ['updatedAt', 'password'] } }
            ],
            offset: (page - 1) * pageSize,
            limit: parseInt(pageSize),
            order: shareOrder,
            row: true,
            distinct: true // count 计算
        })
        if (preview === 1) {
            data.rows.forEach(d => {
             d.content = d.content.slice(0, 1000) // 只是获取预览，减少打了的数据传输。。。
            })
        }

        ctx.body = data
        }
    }

    // 获取帖子详情
    static async findById(ctx) {
        const validator = ctx.validate(
        { ...ctx.params, ...ctx.query },
        {
            id: Joi.number().required(),
            type: Joi.number() // type 用于区分是否增加浏览次数 1 新增浏览次数 0 不新增
        }
        )
        if (validator) {
            const data = await ShareModel.findOne({
                where: { id: ctx.params.id },
                include: [
                {
                    model: FloorModel,
                    attributes: ['id', 'content', 'createdAt'],
                    include: [
                        { model: UserModel, as: 'user', attributes: { exclude: ['updatedAt', 'password'] } }
                    ],
                    row: true
                },
                { model: UserModel, as: 'user', attributes: { exclude: ['updatedAt', 'password'] } }
                ],
                order: [[FloorModel, 'createdAt', 'ASC']], // comment model order
                row: true
            })
            ctx.body = data
        }
    }
  }

  module.exports = ShareController