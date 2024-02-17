import { Product1, Image, Category, Size} from "../../../database.js";
import formatProductData from "../../../Helpers/formatProductData.js";

const getProduct1 = async()=>{
    try {
        const dataFound = await Product1.findAll({
           include: [
            { 
                model: Image,
                attributes: ['images'],
            },
                { model: Category, attributes: ['name'], through: { attributes: [] } },
                { model: Size, attributes: ['name'], through: { attributes: [] } }
           ]
        })
        if(dataFound.length===0){throw new Error('The products table is empty')}
        const data = formatProductData(dataFound, false)
        return data
    } catch (error) {
        throw error;
    }
}

export default getProduct1;