const moment = require('moment')
// share 表
module.exports = (sequelize, dataTypes) => {
  const Share = sequelize.define(
    'share',
    {
      id: { type: dataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
      // userId: { type: dataTypes.INTEGER(11)},
      title: { type: dataTypes.STRING(255), allowNull: false, unique: true },
      content: { type: dataTypes.TEXT },
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

  Share.associate = models => {
    Share.hasMany(models.floor)
    Share.belongsTo(models.user, {
      foreignKey: 'userId',
      targetKey: 'id',
      constraints: false
    })
  }

  return Share
}
