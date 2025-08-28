import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Customer', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: true },
    typeId: { type: DataTypes.STRING, allowNull: true },
    numberId: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    additionalInfo: { type: DataTypes.STRING, allowNull: false }
  }, {
    timestamps: false
  })
}
