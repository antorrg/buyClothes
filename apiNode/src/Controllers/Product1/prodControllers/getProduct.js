import { Product1} from "../../../database.js";
import formatProductData from "../../../Helpers/formatProductData.js";

const getProduct1 = async()=>{
    try {
        const dataFound = await Product1.findByPk(id)
        if(!dataFound){throw new Error('The products table is empty')}
        const data = formatProductData(dataFound, false)
        return data
    } catch (error) {
        throw error;
    }
}


export default getProduct1;