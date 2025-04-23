import { generalProd } from '../../../data/Info/index.js'
import { generalProductService } from '../Controllers/servicesAndControllers.js'

const productCr = async () => {
  for (let i = 0; i < generalProd.length; i++) {
    const data = generalProd[i]

    try {
      // Llamar al controlador post aquí, usando los datos del json
      await generalProductService.create(data)

      console.log(`Successfully: ${data.name}`)
    } catch (error) {
      console.error(`Error when posting the product: ${data.name}: ${error.message}`)
    }
  }
}

export default productCr
