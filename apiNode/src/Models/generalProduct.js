import {DataTypes} from 'sequelize';

export default (sequelize) => {

    sequelize.define('GeneralProduct', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
      
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        released: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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
    {timestamps: true}
    );
}