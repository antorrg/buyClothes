import { BaseService } from '../../../Shared/Services/BaseService.js'
import eh from '../../../Configs/errorHandlers.js'

export class CustomerService extends BaseService {
  constructor (Repository, fieldName, uniqueField = '', parserFunction = null, useImage = false, deleteImages = null, setRole = null) {
    super(Repository, fieldName, uniqueField, parserFunction, useImage, deleteImages)
  }

  async getById (userId) {
    try {
      const response = await this.Repository.getOne(userId, this.uniqueField, true)
      const dataParsed = this.parserFunction ? this.parserFunction(response) : response
      return dataParsed
    } catch (error) {
      eh.processError(error, 'Customer get error')
    }
  }
}
