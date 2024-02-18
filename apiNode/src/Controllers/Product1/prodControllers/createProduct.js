import {Product1, sequelize}from '../../../database.js';
import { imgsCreate } from '../imageController.js';


const createProduct1 = async(name, description, characteristics, released, price, stock, images, category, sizes,  discipline, genre, trademarck) => {
   
    let transaction;
    try {
        // Iniciar una transacción
        transaction = await sequelize.transaction();
        
        // Verificar si el producto ya existe
        const productFound = await Product1.findOne({
            where: {
                name: name.toLowerCase()
            },
            transaction // Incluir la transacción en la consulta
        });
        
        if (productFound) {
            throw new Error('This product already exists!!');
        }
        // if (typeof characteristics !== 'string') {
        //     characteristics = characteristics.toString();
        // }
        
    
        // Crear el nuevo producto dentro de la transacción
        const newData = await Product1.create({
            name, 
            description,
            characteristics,
            released,
            price,
            stock,
        }, { transaction });
        
        // Crear las imágenes asociadas al producto dentro de la transacción
        const newImage = await imgsCreate(name, images, transaction);
        
        // Asociar la imagen al producto dentro de la transacción
        await newData.addImage(newImage, { transaction });
        // Asociar las demas entidades al producto dentro de la transacción 
        await newData.addCategory(category, { transaction })
        //await newData.addSize(size, { transaction })
        if (Array.isArray(sizes) && sizes.length > 0) {
            for (const size of sizes) {
              await newData.addSize(size, { transaction });
            }
          }
        await newData.addDiscipline(discipline, { transaction })
        await newData.addGenre(genre, { transaction })
        await newData.addTrademarck(trademarck, { transaction })
        
        // Commit (confirmar) la transacción si todas las operaciones tienen éxito
        await transaction.commit();
        
        return newData;
    } catch (error) {
        // Revertir la transacción en caso de error
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
};

export default createProduct1;

