import {Product1, Image, Category, Size } from '../../../database.js'
import formatProductData from '../../../Helpers/formatProductData.js'

const getProd1ById = async(id)=>{
    try {
        const dataFound = await Product1.findByPk(id, {
           include: [
                { model: Image, attributes: ['images']},
                { model: Category, attributes: ['name'], through: { attributes: [] } },
                { model: Size, attributes: ['name'], through: { attributes: [] } }
           ]
        })
        if(!dataFound){throw new Error('The products table is empty')}
        const data = formatProductData(dataFound, true);
        return data
    } catch (error) {
        throw error;
    }
}

export default getProd1ById