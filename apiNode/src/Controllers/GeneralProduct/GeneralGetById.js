import { GeneralProduct, Product1, Category, Discipline, Genre, Extra, Trademarck, } from '../../database.js';
import formatProductData from '../../Helpers/formatProductData.js';
const generalProdGetById = async(id)=>{
    try {
        // Obtener todos los productos generales con sus variantes y relaciones
        const dataFound = await GeneralProduct.findByPk(id, {
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
      const data = formatProductData(dataFound, true)
      return data
    } catch (error) {
        throw error;
    }
};

export default generalProdGetById;


