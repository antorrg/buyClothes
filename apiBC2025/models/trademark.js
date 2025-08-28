import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Trademark', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allownull: false
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metaKeywords: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ogImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitterCard: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING, // URL del logo de la marca
      allowNull: true
    },
    officialWebsite: {
      type: DataTypes.STRING,
      allowNull: true
    },
    socialMedia: {
      type: DataTypes.JSON, // Ejemplo: { "facebook": "url", "instagram": "url" }
      allowNull: true
    },
    brandStory: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    enabled: {
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
          enabled: true
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
