import eh from '../Configs/errorHandlers.js'
import SequelizeCache from '../Utils/sequelizeCache.js'

const throwError = eh.throwError

class GeneralService {
  constructor (Repository, fieldName, useCache = false, parserFunction = null, useImage = false, deleteImages = null) {
    this.Repository = Repository
    this.fieldName = fieldName
    this.useCache = useCache
    this.useImage = useImage
    this.deleteImages = deleteImages
    this.parserFunction = parserFunction
  }

  async handleImageDeletion (imageUrl) {
    if (this.useImage && imageUrl) {
      await this.deleteImages(imageUrl)
    }
  }

  async create (data, uniqueField = null) {
    const newRecord = await this.Repository.create(data, uniqueField)

    return this.parserFunction ? this.parserFunction(newRecord) : newRecord
  }

  async getAll (isAdmin = false) {
    // console.log('service',emptyObject)
    const cacheKey = `${this.fieldName.toLowerCase()}`
    if (this.useCache) {
      const cachedData = SequelizeCache.getCache(cacheKey)
      if (cachedData) {
        return {
          data: cachedData,
          cache: true
        }
      }
    }
    const data = await this.Repository.getAll(isAdmin)

    const dataParsed = this.parserFunction ? data.map(dat => this.parserFunction(dat)) : data

    if (this.useCache) {
      SequelizeCache.setCache(cacheKey, dataParsed, 30)
    }
    return {
      data: dataParsed
    }
  }

  async getById (id, isAdmin = false) {
    try {
      const data = await this.Repository.getById(id, isAdmin)

      return this.parserFunction ? this.parserFunction(data) : data
    } catch (error) {
      throw error
    }
  }

  async update (id, newData) {
    // console.log('soy el id en el service : ', id)
    // console.log('soy newData en el service : ', newData)

    let imageUrl = ''
    let deleteImg = false
    try {
      const dataFound = await this.Repository.getById(id, newData)

      if (this.useImage && dataFound.picture && dataFound.picture !== newData.picture) {
        imageUrl = dataFound.picture
        deleteImg = true
      }

      const upData = await this.Repository.update(id, newData)

      if (deleteImg) {
        await this.handleImageDeletion(imageUrl)
      }

      if (this.useCache) SequelizeCache.clearCache()
      return {
        message: `${this.fieldName} updated successfully`,
        data: this.parserFunction ? this.parserFunction(upData) : upData
      }
    } catch (error) {
      throw error
    }
  }

  async delete (id) {
    let imageUrl = ''
    let deleteImg = false
    try {
      const dataFound = await this.Repository.getById(id)

      if (this.useImage) {
        imageUrl = dataFound.picture
        deleteImg = true
      }

      await this.Repository.delete(id)

      if (deleteImg) { await this.handleImageDeletion(imageUrl) }
      if (this.useCache) SequelizeCache.clearCache()

      return `${this.fieldName} deleted successfully`
    } catch (error) {
      throw error
    }
  }
}

export default GeneralService
