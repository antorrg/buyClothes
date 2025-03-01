import {DataTypes}from 'sequelize';

export default (sequelize)=>{
    sequelize.define('Landing', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
            allownull: false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        description : {
            type: DataTypes.TEXT,
            allowNull: true
        },
        picture:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        metaTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        metaDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        metaKeywords: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING, // URL del logo de la marca
            allowNull: true,
        },
        enable:{
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        deletedAt:{
            type: DataTypes.DATE,
            allowNull: true
        },
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
        timestamps: true,
    }
    )
}