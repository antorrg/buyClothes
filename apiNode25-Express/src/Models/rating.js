import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Rating', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 10
      }
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
  })
}
