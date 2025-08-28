import {Category, Discipline, Genre, Trademark} from '../../../src/Configs/database.js'
import * as dt from './data/index.js'


// Usa la función dataBulk para diferentes tablas y conjuntos de datos
export const fillTables =async ()=>{
    await dataBulk(Category, dt.categories,0);
    await dataBulk(Discipline, dt.discip,0);
    await dataBulk(Genre, dt.genre,0);
    await dataBulk(Trademark, dt.trademarks,0);
}


async function dataBulk(table, data, num=0){
    try {
      //Verificar si ya hay datos en la base de datos, si no, entonces los incorpora
      const existingdatas = await table.findAll();
      if (existingdatas.length === num) {
          // Hacer una lectura de la data.json para llenar la tabla
          await table.bulkCreate(data);
          console.log(`"${table.getTableName()}" table filled successfully`);
        } else {
          console.log(`The "${table.getTableName()}" table already contains data.`);
        }
      } catch (error) {
       console.error({error: error.message});
       }
  };