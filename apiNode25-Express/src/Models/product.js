import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },

    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },

    released: {
      type: DataTypes.DATEONLY,
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
