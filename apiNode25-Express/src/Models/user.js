import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },

    sub: { type: DataTypes.STRING, allowNull: true, unique: true },

    password: { type: DataTypes.STRING, allowNull: true },

    nickname: { type: DataTypes.STRING, allowNull: true },

    name: { type: DataTypes.STRING, allowNull: true },

    given_name: { type: DataTypes.STRING, allowNull: true },

    family_name: { type: DataTypes.STRING, allowNull: true },

    picture: { type: DataTypes.STRING, allowNull: false },

    role: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[9, 1, 2, 3]] // Por ejemplo, 9: super admin, 1: user, 2: moderator, 3: admin
      }
    },
    country: { type: DataTypes.STRING, allowNull: true },

    enable: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },

    deletedAt: { type: DataTypes.DATE, allowNull: true }
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
          deletedAt: null
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
