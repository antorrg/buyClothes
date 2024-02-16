import {Trademarck} from '../../database.js';

const tradeCreate = async(name)=>{

    try {
        const data = await Trademarck.findOne({
            where: {
                name:name,
                deletedAt:false,
            }
        })
        if(!data){
            try {
                const newItem = await Trademarck.create({
                    name:name,
                
                });
                return newItem;  
            } catch (error) {
                throw new Error('Error saving trademarck')
            }
        }
        if(data){throw new Error('This trademarck name already exists')};
    } catch (error) {
        throw error;
    }
};

const tradeGet = async()=>{
    try {
        const data = await Trademarck.findAll({
            where: {
                deletedAt: false,
            },
        });
    if(data.length == 0){
        throw new Error('The trademarck table is empty!!')
    }else{
        return data;
    }
    } catch (error) {
        throw error;
    }
};
const tradeUpdate = async(id,newData)=>{
    const { name, enable } = newData;
    try {
        const dataFound = await Trademarck.findByPk(id, {
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
            throw new Error('Error updating trademarck')
        }
    }else{
        throw new Error('Trademarck not found')
    }
   
    } catch (error) {
        throw error;
    }
};

const tradeDelete = async (id)=>{
try {
  const dataFound = await Trademarck.findByPk(id, {
      where :{
          deletedAt:false,
      }
  });
if(dataFound){
  try {
      const upData = await dataFound.update({deletedAt:true});
      return upData;
  } catch (error) {
      throw new Error('Error deleting trademarck')
  }
}else{
  throw new Error('Trademarck not found')
}
} catch (error) {
  throw error;
}
}

export {
    tradeCreate,
    tradeGet,
    tradeUpdate,
    tradeDelete
};