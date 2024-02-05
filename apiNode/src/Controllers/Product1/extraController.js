import {Extra} from '../../database.js';

const extraCreate = async(name)=>{

    try {
        const data = await Extra.findOne({
            where: {
                name:name,
                deletedAt:false,
            }
        })
        if(!data){
            try {
                const newItem = await Extra.create({
                    name:name,
                
                });
                return newItem;  
            } catch (error) {
                throw new Error('Error saving extra')
            }
        }
        if(data){throw new Error('This extra name already exists')};
    } catch (error) {
        throw error;
    }
};

const extraGet = async()=>{
    try {
        const data = await Extra.findAll({
            where: {
                deletedAt: false,
            },
        });
    if(data.length == 0){
        throw new Error('The extra table is empty!!')
    }else{
        return data;
    }
    } catch (error) {
        throw error;
    }
};
const extraUpdate = async(id,newData)=>{
    const { name, enable } = newData;
    try {
        const dataFound = await Extra.findByPk(id, {
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
            throw new Error('Error updating extra')
        }
    }else{
        throw new Error('Extra not found')
    }
   
    } catch (error) {
        throw error;
    }
};

const extraDelete = async (id)=>{
try {
  const dataFound = await Extra.findByPk(id, {
      where :{
          deletedAt:false,
      }
  });
if(dataFound){
  try {
      const upData = await dataFound.update({deletedAt:true});
      return upData;
  } catch (error) {
      throw new Error('Error deleting extra')
  }
}else{
  throw new Error('Extra not found')
}
} catch (error) {
  throw error;
}
}

export {
    extraCreate,
    extraGet,
    extraUpdate,
    extraDelete
};