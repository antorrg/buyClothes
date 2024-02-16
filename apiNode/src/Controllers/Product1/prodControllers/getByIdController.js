import {Product1, Category, Size, Image} from '../../../database.js'

const getProd1ById = async(id)=>{
    try {
        const data = await Product1.findByPk(id, {
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

export default getProd1ById