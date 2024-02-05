import {Size} from '../../database.js';

const sizeCreate = async(name)=>{

    try {
        const data = await Size.findOne({
            where: {
                name:name,
                deletedAt:false,
            }
        })
        if(!data){
            try {
                const newItem = await Size.create({
                    name:name,
                
                });
                return newItem;  
            } catch (error) {
                throw new Error('Error saving size')
            }
        }
        if(data){throw new Error('This size name already exists')};
    } catch (error) {
        throw error;
    }
};

const sizeGet = async()=>{
    try {
        const data = await Size.findAll({
            where: {
                deletedAt: false,
            },
        });
    if(data.length == 0){
        throw new Error('The size table is empty!!')
    }else{
        return data;
    }
    } catch (error) {
        throw error;
    }
};
const sizeUpdate = async(id,newData)=>{
    const { name, enable } = newData;
    try {
        const dataFound = await Size.findByPk(id, {
            where :{
                deletedAt:false,
            }
        });
    if(dataFound){
        try {
            const upData = await dataFound.update({name: name,
                enable: enable,
            },);
            return upData;
        } catch (error) {
            throw new Error('Error updating size')
        }
    }else{
        throw new Error('Size not found')
    }
   
    } catch (error) {
        throw error;
    }
};

const sizeDelete = async (id)=>{
try {
  const dataFound = await Size.findByPk(id, {
      where :{
          deletedAt:false,
      }
  });
if(dataFound){
  try {
      const upData = await dataFound.update({deletedAt:true});
      return upData;
  } catch (error) {
      throw new Error('Error deleting size')
  }
}else{
  throw new Error('Size not found')
}
} catch (error) {
  throw error;
}
}

export {
    sizeCreate,
    sizeGet,
    sizeUpdate,
    sizeDelete
};