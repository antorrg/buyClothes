import { Op } from 'sequelize';

export const sizeFilter = (size)=>{
    const sizeName = size? size.split(','): {}
    console.log('soy filterSize ',sizeName)
    
    if (size) {
        return  {  size: { [Op.in]: sizeName}}
        
    }
}

export const colorFilter = (color)=>{
    const colorName = color? color.split(','):{}
    console.log('soy filterColor ',colorName)

    if (color) {
        return  {  name: { [Op.in]: colorName}}
        
    }

}