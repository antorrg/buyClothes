import { Product1, Image, Category, Size} from "../../../database.js";

const getProduct1 = async()=>{
    try {
        const data = await Product1.findAll({
           include: [
            { 
                model: Image,
                as: 'Images', // Alias de la asociación
                attributes: ['name', 'images'],
            },
                { model: Category, attributes: ['name'], through: { attributes: [] } },
                { model: Size, attributes: ['name'], through: { attributes: [] } }
           ]
        })
        if(data.length===0){throw new Error('The products table is empty')}
        return data
    } catch (error) {
        throw error;
    }
}

export default getProduct1;