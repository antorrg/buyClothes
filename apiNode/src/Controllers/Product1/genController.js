import {Genre} from '../../database.js';

const genCreate = async(name)=>{

    try {
        const data = await Genre.findOne({
            where: {
                name:name,
                deletedAt:false,
            }
        })
        if(!data){
            try {
                const newItem = await Genre.create({
                    name:name,
                
                });
                return newItem;  
            } catch (error) {
                throw new Error('Error saving genre')
            }
        }
        if(data){throw new Error('This trademarck name already exists')};
    } catch (error) {
        throw error;
    }
};

const genGet = async()=>{
    try {
        const data = await Genre.findAll({
            where: {
                deletedAt: false,
            },
        });
    if(data.length == 0){
        throw new Error('The genre table is empty!!')
    }else{
        return data;
    }
    } catch (error) {
        throw error;
    }
};
const genUpdate = async(id,newData)=>{
    const { name, enable } = newData;
    try {
        const dataFound = await Genre.findByPk(id, {
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
            throw new Error('Error updating genre')
        }
    }else{
        throw new Error('Genre not found')
    }
   
    } catch (error) {
        throw error;
    }
};

const genDelete = async (id)=>{
try {
  const dataFound = await Genre.findByPk(id, {
      where :{
          deletedAt:false,
      }
  });
if(dataFound){
  try {
      const upData = await dataFound.update({deletedAt:true});
      return upData;
  } catch (error) {
      throw new Error('Error deleting genre')
  }
}else{
  throw new Error('Genre not found')
}
} catch (error) {
  throw error;
}
}

export {
    genCreate,
    genGet,
    genUpdate,
    genDelete
};