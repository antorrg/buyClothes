import {DataTypes}from 'sequelize';

export default (sequelize)=>{
    sequelize.define('Size', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
            allownull: false
        },
    },
    {timestamps: true},
    )
}