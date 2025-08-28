import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('User', {
    id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    nickname: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 1, validate: { isIn: [[9, 1, 2, 3]] } },
    picture: { type: DataTypes.STRING, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deletedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null }
  }, {
    scopes: {
      enabledOnly: {
        where: {
          enabled: true
        }
      },
      allRecords: {} // No aplica ningún filtro
    },
    timestamps: false

  })
}
