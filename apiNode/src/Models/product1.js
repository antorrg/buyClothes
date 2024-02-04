import {DataTypes} from 'sequelize';

export default (sequelize) => {

    sequelize.define('Product1', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        productCode: {
            type: DataTypes.STRING,
            defaultValue: function () {
              // Lógica para generar un código único (puedes personalizarlo según tus necesidades)
              const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
              const datePart = new Date().toISOString().replace(/[-:.]/g, '');
              return `${datePart}-${randomPart}`;
            },
            allowNull: false,
            unique: true, // Asegura que el código sea único en la base de datos
          },
      
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        characteristics: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        released: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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
        deleteAt:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        }       
    },
    {timestamps: true}
    );
}