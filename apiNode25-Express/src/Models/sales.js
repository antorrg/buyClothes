import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Sales', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    enable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {

    defaultScope: {
      where: {
        deletedAt: null
      }
    },
    scopes: {
      enabledOnly: {
        where: {
          enable: true
        }
      },
      allRecords: {
        // No aplica ningún filtro
      }
    },
    paranoid: true,
    timestamps: true
  }
  )
}
