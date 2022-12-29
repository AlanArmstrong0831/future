const Router = require('koa-router')
const router = new Router({ prefix: '/share' })
const { getList, findById, create } = require('../controllers/share')
const { createReply } = require('../controllers/floor')

router
.get('/list', getList) // 获取帖子列表
.get('/:id', findById) // 获取帖子内容
.post('/', create) // 发帖
.post('/createReply', createReply) // 回帖

module.exports = router
