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
            type: DataTypes.ENUM('Category', 'Discipline', 'Trademark', 'Genre'),
            allowNull: true,
        },
        enable:{
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },
        deletedAt:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        }
        
    },
    {timestamps: true},
    )
};