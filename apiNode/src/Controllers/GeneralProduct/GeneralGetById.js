import { GeneralProduct, Product1, Category, Discipline, Genre, Extra, Trademarck, } from '../../database.js';
import {Op} from 'sequelize'
import formatProductData from '../../Helpers/formatProductData.js';
import {sizeFilter, colorFilter} from './helpers/getById.js'
const generalProdGetById = async(id, size, color,)=>{
    try {
        const searchConditions = {};
        if (size) {
            searchConditions.size = size;
        }
        if (color) {
            searchConditions['$Product1.Extra.name$'] = color;
        }
        const sizeClause = sizeFilter(size)
        const colorClause = colorFilter(color)
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
                        { model: Extra, 
                            where: colorClause,
                            attributes: ['name'] , through: { attributes: [] }, 
                        },
                        // Puedes agregar otras relaciones aquí según sea necesario
                    ],
                    where: sizeClause
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

