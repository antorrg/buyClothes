import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Cache', {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    value: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    // tableName: 'cache',
    timestamps: true, // incluye createdAt y updatedAt
    updatedAt: false // opcional: evita actualizar la fecha al hacer upsert
  })
}
