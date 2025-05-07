import GeneralService from './GeneralService.js'
import eh from '../Configs/errorHandlers.js'

class ProductService extends GeneralService {
  constructor (Repository, fieldName, useCache = false, parserFunction = null, useImage = false, deleteImages = null) {
    super(Repository, fieldName, useCache, parserFunction, useImage, deleteImages)
  }

  async multImageDeletion (images) {
    if (this.useImage && images.length > 0) {
      try {
        const results = await Promise.allSettled(images.map((dat) => this.deleteImages(dat)))
        const errors = results.filter(result => result.status === 'rejected')
        if (errors.length > 0) {
          console.error('Errores en la eliminación de imágenes:', errors.map(err => err.reason))
        }
      } catch (error) {
        console.error('Error crítico al eliminar imágenes:', error)
        throw error
      }
    }
  }

  async getAll (queryObject, isAdmin) {
    const { page, size, name, trademark, fields } = queryObject
    // console.log('service',emptyObject)
    const cacheKey = `${this.fieldName.toLowerCase()}`
    if (this.useCache) {
      const cachedData = cache.get(cacheKey)
      if (cachedData) {
        return {
          data: cachedData,
          cache: true
        }
      }
    }
    const data = await this.Repository.getProduct(queryObject, isAdmin)

    const dataParsed = this.parserFunction ? data.results.map(dat => this.parserFunction(dat)) : data.results
    const finalData = {
      info: data.info,
      results: dataParsed
    }
    if (this.useCache) {
      cache.set(cacheKey, finalData)
    }
    // console.log(dataParsed)
    return {
      data: finalData,
      cache: false
    }
  }

  async getById (id, queryObject, isAdmin) {
    const { size, color } = queryObject
    try {
      const data = await this.Repository.getById(id, size, color, isAdmin)

      return this.parserFunction ? this.parserFunction(data, true) : data
    } catch (error) {
      throw error
    }
  }

  async update (id, newData) {
    // console.log('soy el id en el service : ', id)
    // console.log('soy newData en el service : ', newData)

    let imageUrl = []
    let deleteImg = false
    try {
      const dataFound = await this.Repository.getById(id, newData)

      if (this.useImage && newData.images) {
        const oldImages = dataFound.images || []
        const newImages = newData.images || []
        imageUrl = oldImages.filter(img => !newImages.includes(img))
        newData.images = newImages.filter(img => !oldImages.includes(img))
        deleteImg = imageUrl.length > 0
      }

      const upData = await this.Repository.update(id, newData)

      if (deleteImg && imageUrl.length > 0) {
        await this.multImageDeletion(imageUrl)
      }

      if (this.useCache) this.clearCache()
      return {
        message: `${this.fieldName} updated successfully`,
        data: this.parserFunction ? this.parserFunction(upData) : upData
      }
    } catch (error) {
      console.error(`Error al actualizar ${this.fieldName}:`, error)
      throw error
    }
  }

  async specialUpdate (id, newData) {
    // console.log('soy el id en el service : ', id)
    // console.log('soy newData en el service : ', newData)
    try {
      const dataFound = await this.Repository.getById(id, newData)

      if (this.useImage && newData.images) {
        const oldImages = dataFound.images || []
        const newImages = newData.images || []
        imageUrl = oldImages.filter(img => !newImages.includes(img))
        newData.images = newImages.filter(img => !oldImages.includes(img))
        deleteImg = imageUrl.length > 0
      }

      const upData = await this.Repository.specialUpdate(id, newData)

      if (this.useCache) this.clearCache()
      return {
        message: `${this.fieldName} updated successfully`,
        data: this.parserFunction ? this.parserFunction(upData) : upData
      }
    } catch (error) {
      console.error(`Error al actualizar ${this.fieldName}:`, error)
      throw error
    }
  }

  async delete (id) {
    let imageUrl = ''
    const dataFound = await this.Repository.getById(id)

    this.useImage ? imageUrl = dataFound.picture : ''

    await this.Repository.delete(id)

    await this.handleImageDeletion(imageUrl)

    if (this.useCache) this.clearCache()
    return `${this.fieldName} deleted successfully`
  }
}

export default ProductService
