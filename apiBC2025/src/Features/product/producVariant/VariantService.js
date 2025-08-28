import { BaseService } from '../../../Shared/Services/BaseService.js'

export class VariantService extends BaseService {
  constructor (Repository, fieldName, uniqueField = '', parserFunction = null, useImage = false, deleteImages = null) {
    super(Repository, fieldName, uniqueField, parserFunction, useImage, deleteImages)
  }

  async getAll (data, isAdmin) {
    const variants = await this.Repository.getAll(data, this.uniqueField, isAdmin)
    return {
      message: `${this.fieldName}s found successfully`,
      results: this.parserFunction ? variants.map(variant => this.parserFunction(variant)) : variants
    }
  }
}
