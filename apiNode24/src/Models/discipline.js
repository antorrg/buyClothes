import {DataTypes}from 'sequelize';

export default (sequelize)=>{
    sequelize.define('Discipline', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
            allownull: false
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
}