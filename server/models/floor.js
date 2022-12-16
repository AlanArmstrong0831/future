const moment = require('moment')
// article 表
module.exports = (sequelize, dataTypes) => {
  const Floor = sequelize.define(
    'floor',
    {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      shareId: dataTypes.INTEGER(11), // 楼层所属帖子 id
      content: { type: dataTypes.TEXT, allowNull: false }, // 楼层详情
      createdAt: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
        get() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      updatedAt: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
        get() {
          return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    {
      timestamps: true
    }
  )

  Floor.associate = models => {
    Floor.belongsTo(models.article, {
      as: 'share',
      foreignKey: 'shareId',
      targetKey: 'id',
      constraints: false
    })

    Floor.belongsTo(models.user, {
      foreignKey: 'userId',
      targetKey: 'id',
      constraints: false
    })
  }

  return Floor
}
