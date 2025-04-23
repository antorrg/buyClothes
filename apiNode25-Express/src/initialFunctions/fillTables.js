// En un archivo donde se manejan las operaciones relacionadas con el llenado de datos (por ejemplo, fillData.js)
import dataBulk from './dataBulk.js'
import { GeneralProduct, Attribute, Trademarck, Extra } from '../../database.js' // Importa tus modelos de tablas
import { attributes, trademarks, extrass, users } from '../../../data/Info/index.js'
import productCr from './ProductCr.js'

// Usa la función dataBulk para diferentes tablas y conjuntos de datos
const fillTables = async (table, data) => {
  await dataBulk(Attribute, attributes, 0)
  await dataBulk(Trademarck, trademarks, 0)
  await dataBulk(Extra, extrass, 0)
  const existdatas = await GeneralProduct.findAll()
  if (existdatas.length === 0) {
    // Hacer una lectura de la data.json para llenar la tabla
    await productCr()
    console.log('GeneralProduct & Product1 tables filled successfully!')
  } else {
    console.log('The GeneralProduct & Product1 tables already contains data.')//
  }
}

export default fillTables
