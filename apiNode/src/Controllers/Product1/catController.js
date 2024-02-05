import {Category} from '../../database.js';

const catsCreate = async(name)=>{

    try {
        const data = await Category.findOne({
            where: {
                name:name,
                deletedAt:false,
            }
        })
        if(!data){
            try {
                const newCat = await Category.create({
                    name:name,
                
                });
                return newCat;  
            } catch (error) {
                throw new Error('Error saving category')
            }
        }
        if(data){throw new Error('This category name already exists')};
    } catch (error) {
        throw error;
    }
};

const catsGet = async()=>{
    try {
        const data = await Category.findAll({
            where: {
                deletedAt: false,
            },
        });
    if(data.length===0){
        throw new Error('The category table is empty!!')
    }else{
        return data;
    }
    } catch (error) {
        throw error;
    }
};
const catsUpdate = async(id,newData)=>{
    const { name, enable } = newData;
    try {
        const dataFound = await Category.findByPk(id, {
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
            throw new Error('Error updating category')
        }
    }else{
        throw new Error('Category not found')
    }
   
    } catch (error) {
        throw error;
    }
};

const catsDelete = async (id)=>{
try {
  const dataFound = await Category.findByPk(id, {
      where :{
          deletedAt:false,
      }
  });
if(dataFound){
  try {
      const upData = await dataFound.update({deletedAt:true});
      return upData;
  } catch (error) {
      throw new Error('Error deleting category')
  }
}else{
  throw new Error('Category not found')
}
} catch (error) {
  throw error;
}
}

export {
    catsCreate,
    catsGet,
    catsUpdate,
    catsDelete
};