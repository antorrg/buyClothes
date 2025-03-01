import {DataTypes} from 'sequelize';

export default(sequelize)=>{
    sequelize.define('ProductAttributes',{
        type: {
            type: DataTypes.ENUM('Category', 'Discipline', 'Genre'),
            allowNull: false
        }
    },
    { timestamps: false })
}