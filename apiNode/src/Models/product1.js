import {DataTypes} from 'sequelize';

export default (sequelize) => {

    sequelize.define('Product1', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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
        price:{
            type: DataTypes.DECIMAL(7,2),
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
            type: DataTypes.BOOLEAN,
            defaultValue:false
        }       
    },
    {timestamps: true}
    );

}