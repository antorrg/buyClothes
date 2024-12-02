import { DataTypes } from "sequelize";

export default (sequelize)=>{
    sequelize.define('Sales', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        value:{  type: DataTypes.DECIMAL(7,2),
            allowNull: false,},

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
