import { DataTypes } from "sequelize";

export default (sequelize)=>{
    sequelize.define('Company', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        picture: { type: DataTypes.STRING, allowNull: true},
        email: { type: DataTypes.STRING, allowNull: false },
        web_site: { type: DataTypes.STRING, allowNull: true},

        country: {
            type: DataTypes.STRING,
            allowNull: true
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
