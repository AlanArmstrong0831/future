// import models
// const { tag: TagModel, category: CategoryModel, sequelize } = require('../models')
const { tag: TagModel, sequelize } = require('../models')

class TagController {
  //  获取标签列表
  static async getTagList(ctx) {
    const data = await TagModel.findAll({
      attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
      group: 'name',
      where: {
        articleId: { $not: null }
      },
      order: [[sequelize.fn('COUNT', sequelize.col('name')), 'desc']]
    })

    ctx.body = data
  }

  static async getCategoryList(ctx) {
    // const data = await CategoryModel.findAll({
    //   attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
    //   group: 'name',
    //   where: {
    //     articleId: { $not: null }
    //   },
    //   order: [[sequelize.fn('COUNT', sequelize.col('name')), 'desc']]
    // })

    const data = {name: "alan"}

    ctx.body = data
  }
}

module.exports = TagController
