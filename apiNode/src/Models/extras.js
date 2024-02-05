import {DataTypes} from 'sequelize';

export default (sequelize)=>{
    sequelize.define('Extra', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        name:{
            type: DataTypes.ARRAY(DataTypes.STRING),
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
    })
}