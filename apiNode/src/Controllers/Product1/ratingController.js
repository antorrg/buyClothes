import {Rating} from '../../database.js';

const ratCreate = async(comment, score)=>{

            try {
                const newItem = await Rating.create({
                    comment,
                    score,
                
                });
                return newItem;  
            } catch (error) {
                throw new Error('Error saving rating')
            }
    
};

const ratGet = async()=>{
    try {
        const data = await Rating.findAll({
            where: {
                deletedAt: false,
            },
        });
    if(data.length == 0){
        throw new Error('The rating table is empty!!')
    }else{
        return data;
    }
    } catch (error) {
        throw error;
    }
};
const ratUpdate = async(id,newData)=>{
    const parsedData = {
        comment:newData.comment,
        score: parseFloat(newData.score), 
        enable: Boolean(newData.enable)
    }
    try {
        const dataFound = await Rating.findByPk(id, {
            where :{
                deletedAt:false,
            }
        });
    if(dataFound){
        try {
            const upData = await dataFound.update(parsedData);
            return upData;
        } catch (error) {
            throw new Error('Error updating rating')
        }
    }else{
        throw new Error('Rating not found')
    }
   
    } catch (error) {
        throw error;
    }
};

const ratDelete = async (id)=>{
try {
  const dataFound = await Rating.findByPk(id, {
      where :{
          deletedAt:false,
      }
  });
if(dataFound){
  try {
      const upData = await dataFound.update({deletedAt:true});
      return upData;
  } catch (error) {
      throw new Error('Error deleting rating')
  }
}else{
  throw new Error('Rating not found')
}
} catch (error) {
  throw error;
}
}

export {
    ratCreate,
    ratGet,
    ratUpdate,
    ratDelete
};