import {Discipline} from '../../database.js';

const discCreate = async(name)=>{

    try {
        const data = await Discipline.findOne({
            where: {
                name:name,
                deletedAt:false,
            }
        })
        if(!data){
            try {
                const newItem = await Discipline.create({
                    name:name,
                
                });
                return newItem;  
            } catch (error) {
                throw new Error('Error saving discipline')
            }
        }
        if(data){throw new Error('This discipline name already exists')};
    } catch (error) {
        throw error;
    }
};

const discGet = async()=>{
    try {
        const data = await Discipline.findAll({
            where: {
                deletedAt: false,
            },
        });
    if(data.length == 0){
        throw new Error('The discipline table is empty!!')
    }else{
        return data;
    }
    } catch (error) {
        throw error;
    }
};
const discUpdate = async(id,newData)=>{
    const { name, enable } = newData;
    try {
        const dataFound = await Discipline.findByPk(id, {
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
            throw new Error('Error updating discipline')
        }
    }else{
        throw new Error('Discipline not found')
    }
   
    } catch (error) {
        throw error;
    }
};

const discDelete = async (id)=>{
try {
  const dataFound = await Discipline.findByPk(id, {
      where :{
          deletedAt:false,
      }
  });
if(dataFound){
  try {
      const upData = await dataFound.update({deletedAt:true});
      return upData;
  } catch (error) {
      throw new Error('Error deleting discipline')
  }
}else{
  throw new Error('Discipline not found')
}
} catch (error) {
  throw error;
}
}

export {
    discCreate,
    discGet,
    discUpdate,
    discDelete
};