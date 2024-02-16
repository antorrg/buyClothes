import {Image} from '../../database.js';

const imgsCreate = async(name, images)=>{
    try {
        const data = await Image.findOne({
            where: {
                name:name,
            }
        })
        if(!data){
            try {
                const newImage = await Image.create({
                    name:`image_${name}`,//Nombre por defecto
                    images:images, //array de imagenes
                });
                return newImage;  
            } catch (error) {
                throw new Error('Error saving images')
            }
        }
        if(data){throw new Error('This image name already exists')};
    } catch (error) {
        throw error;
    }
};

const imgsGet = async()=>{
    try {
        const data = await Image.findAll();
    if(data.length === 0){
        throw new Error('The images table is empty!!')
    }else{
        return data;
    }
    } catch (error) {
        throw error;
    }
};

const imgsUpd = async()=>{};

const  imgsDel = async()=>{};

export {
    imgsGet, 
    imgsCreate,
    imgsUpd, 
    imgsDel
};