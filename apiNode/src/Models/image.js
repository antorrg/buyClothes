import {DataTypes} from 'sequelize';

export default (sequelize)=>{
    sequelize.define('Image', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,

        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
          },
    },
    {timestamps: true},
    )
}

