import { GeneralProduct, Product1, Category, Discipline, Genre, Extra, Trademarck, } from '../../database.js';
import formatProductData from '../../Helpers/formatProductData.js';

const generalProdGet = async (req, res) => {
    try {
        // Obtener todos los productos generales con sus variantes y relaciones
        const dataFound = await GeneralProduct.findAll({
            include: [
                { model: Category, attributes: ['name'] , through: { attributes: [] } },
                { model: Discipline, attributes: ['name'] , through: { attributes: [] } },
                { model: Genre, attributes: ['name'] , through: { attributes: [] } },
                { model: Trademarck, attributes: ['name'] , through: { attributes: [] } },
                {
                    model: Product1,
                    include: [
                        { model: Extra, attributes: ['name'] , through: { attributes: [] } },
                        // Puedes agregar otras relaciones aquí según sea necesario
                    ],
                },
                
            ],
        });
        if(dataFound.length===0){throw new Error('The products table is empty')}
       // Enviar la respuesta con los productos
        // const data = formatProductData(dataFound, false)
        // return data
        return dataFound
    } catch (error) {
        throw error;
    }
};



export default generalProdGet;

// if(dataFound.length===0){throw new Error('The products table is empty')}
// const data = formatProductData(dataFound, false)
// return data
// } catch (error) {
// throw error;
// }