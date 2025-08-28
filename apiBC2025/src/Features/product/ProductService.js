import { BaseService } from '../../Shared/Services/BaseService.js'
import * as db from '../../Configs/database.js'
import eh from '../../Configs/errorHandlers.js'


export class ProductService extends BaseService {
  constructor (Repository, fieldName, uniqueField = '', parserFunction = null, useImage = false, deleteImages = null, Variant= null, JsonService) {
    super(Repository, fieldName, uniqueField, parserFunction, useImage, deleteImages)
    this.Variant = Variant
    this.JsonService = JsonService
  }
   async createReplica(id){
     try {
       const product = await this.getById(id)
       const data = {productId: id, product:product.results}
       await this.JsonService.create(data)

     } catch (error) {
      eh.processError(error, 'JsonService error')
     }
   }
   async updateReplica(productId){
     try {
       const jsonprod = await this.JsonService.getById(productId)
       const jsonId = jsonprod.id
       const product = await this.getById(productId)
       const data = product.results
       if(data.enabled=== true){
       await this.JsonService.update(jsonId, {product: data})
       }else{
        await this.JsonService.delete(jsonId)
       }

     } catch (error) {
      eh.processError(error, 'JsonService error')
     }
   }
   async deleteReplica(productId){
     try {
       const jsonId = await this.JsonService.getById(productId).id
       await this.JsonService.delete(jsonId)
     } catch (error) {
      eh.processError(error, 'JsonService error')
     }
   }
   async create (data) {
    try {
   
      const newProduct =  await this.Repository.create(data)
      await this.createReplica(newProduct.product.id)
     
      return {
        message: 'Product create successfully',
        results: newProduct
      }
    } catch (error) {
      eh.processError(error, 'Product error')
    }
  }
 
   async getById (id) {
      try {
        const response = await this.Repository.getById(id)
        const dataParsed = this.parserFunction ? this.parserFunction(response, true) : response
        return {
          message: `${this.fieldName} found successfully`,
          results: dataParsed
        }
      } catch (error) {
        eh.processError(error, `Get Service: ${this.fieldName} error`)
      }
    }

     async getJson (productId){
    return await this.JsonService.getById(productId)
  }

}

/*
export class ProductService extends BaseService {
  constructor(
    Repository,
    fieldName,
    uniqueField = '',
    parserFunction = null,
    useImage = false,
    deleteImages = null,
    Variant = null,
    JsonService
  ) {
    super(Repository, fieldName, uniqueField, parserFunction, useImage, deleteImages)
    this.Variant = Variant
    this.JsonService = JsonService
  }
 async productFound(id){
          const prod = await this.getById(id)
          return prod.results
      }

async #syncReplica(productId) {
  try {
    
    const product = await this.productFound(productId)
    console.log('estoy en sync: ', product)

    const data = {
      productId: product.id,
      product: product
    }

    const existing = await this.JsonService.getById(product.id)

    if (product.enabled === true) {
      if (existing) {
        await this.JsonService.update(existing.id, { product })
      } else {
        await this.JsonService.create(data)
      }
    } else {
      if (existing) {
        await this.JsonService.delete(existing.id)
      }
    }
  } catch (error) {
    eh.processError(error, 'JsonService sync error')
  }
}


  async create(data) {
    try {
      const newProduct = await this.Repository.create(data)
      const parsedProduct = this.parserFunction
        ? this.parserFunction(newProduct.product)
        : newProduct.product
        console.log(parsedProduct.id)

      await this.#syncReplica(parsedProduct.id)

      return {
        message: 'Product created successfully',
        results: newProduct
      }
    } catch (error) {
      eh.processError(error, 'Product creation error')
    }
  }

  async update(id, data) {
    try {
      const updated = await this.Repository.update(id, data)
      const parsedProduct = this.parserFunction
        ? this.parserFunction(updated.product)
        : updated.product

      await this.#syncReplica(id)

      return {
        message: 'Product updated successfully',
        results: updated
      }
    } catch (error) {
      eh.processError(error, 'Product update error')
    }
  }

  async delete(id) {
    try {
      const existing = await this.JsonService.getById(id)
      if (existing) {
        await this.JsonService.delete(existing.id)
      }
      await this.Repository.delete(id)

      return { message: 'Product deleted successfully' }
    } catch (error) {
      eh.processError(error, 'Product deletion error')
    }
  }

  async getById(id) {
    try {
      const response = await this.Repository.getById(id)
      const dataParsed = this.parserFunction
        ? this.parserFunction(response, true)
        : response

      return {
        message: `${this.fieldName} found successfully`,
        results: dataParsed
      }
    } catch (error) {
      eh.processError(error, `Get Service: ${this.fieldName} error`)
    }
  }

  async getJson(productId) {
    return await this.JsonService.getById(productId)
  }
}

*/