// En un archivo donde se manejan las operaciones relacionadas con el llenado de datos (por ejemplo, fillData.js)
import dataBulk from './dataBulk.js';
import { GeneralProduct, User, Category, Discipline, Genre,Trademarck, Extra} from '../../database.js'; // Importa tus modelos de tablas
import { categories, discip, gender, trademarks, extrass, users} from '../../../data/Info/index.js'
import productCr from './ProductCr.js';


// Usa la función dataBulk para diferentes tablas y conjuntos de datos
const fillTables =async (table, data)=>{
    await dataBulk(User, users, 2);
    await dataBulk(Category, categories,0);
    await dataBulk(Discipline, discip,0);
    await dataBulk(Genre, gender,0);
    await dataBulk(Trademarck, trademarks,0);
    await dataBulk(Extra, extrass,0);
    const existdatas = await GeneralProduct.findAll();
    if (existdatas.length ===0 ) {
     // Hacer una lectura de la data.json para llenar la tabla
    await productCr();
    console.log(`GeneralProduct & Product1 tables filled successfully!`);
         } else {
           console.log(`The GeneralProduct & Product1 tables already contains data.`);//
         }
}

export default fillTables;
