import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Cart', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    producId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productVariantId: {
         type: DataTypes.STRING,
         allowNull: false
    },
     userId: {
        type: DataTypes.STRING,
         allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    paranoid: false,
    timestamps: true
  }
  )
}
