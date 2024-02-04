import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define('Rating', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min : 0,
                    max: 5
                }
            },
           
    });
};