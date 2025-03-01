import {DataTypes} from 'sequelize';

export default (sequelize) => {

    sequelize.define('ProductVariant', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        order:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        characteristics: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
          },
          size:{
            type: DataTypes.STRING,
            allownull: false
        },
        color:{
            type: DataTypes.STRING,
            allownull: false
        },
        price:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        
        stock:{
            type: DataTypes.INTEGER,
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
    );

}