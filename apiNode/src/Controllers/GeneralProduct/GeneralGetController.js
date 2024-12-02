import { GeneralProduct, Product1, Category, Discipline, Genre, Extra, Trademarck, } from '../../database.js';
import formatProductData from '../../Helpers/formatProductData.js';
import {prevPageUrl, nextPageUrl} from './helpers/index.js'

const generalProdGet = async (req, page) => {
      const pageSize = 3;
      const offSet = (page-1)*pageSize
    try {    
        const {rows: dataFound, count: totalCount }= await GeneralProduct.findAndCountAll({
                limit: pageSize,
                offset: offSet,
                distinct: true,

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
        if(dataFound.length===0){throw new Error('Not found. The products table is empty')
        }else{
          const data = formatProductData(dataFound, false)
            const totalPages = Math.ceil(totalCount / pageSize)
            const responseData = {
                info: {
                    count: totalCount,
                    pages: totalPages,
                    prev: prevPageUrl(req, totalPages, page),
                    currentPage: page,
                    next: nextPageUrl(req, totalPages, page)
                },
                results: data,
            }
            return responseData;
        }
        
    } catch (error) {
        throw error;
    }
};



export default generalProdGet;
