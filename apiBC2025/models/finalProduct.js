import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('FinalProduct', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ['productId'] // índice B-Tree por defecto
      }
    ]
  }
  )
}
