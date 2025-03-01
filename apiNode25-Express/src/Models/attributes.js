import {DataTypes} from 'sequelize';

export default (sequelize)=>{
    sequelize.define('Attributes', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type: DataTypes.STRING,
            allownull: false,
        },
        type: {
            type: DataTypes.ENUM('Category', 'Discipline', 'Genre'),
            allowNull: true,
        },
        enable:{
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },{
    
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
    })
};