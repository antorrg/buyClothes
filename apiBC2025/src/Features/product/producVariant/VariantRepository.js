import BaseRepository from '../../../Shared/Repositories/BaseRepository.js'
import eh from '../../../Configs/errorHandlers.js'

export class VariantRepository extends BaseRepository {
  constructor (Model, dataEmpty = null) {
    super(Model, dataEmpty)
  }

  async getAll (data, uniqueField, isAdmin = false) {
    try {
      const whereClause = {}
      if (uniqueField) {
        whereClause[uniqueField] = data
      }
      const response = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findAll({ where: whereClause })
      return response
    } catch (error) {
      eh.processError(error, 'Variant')
    }
  }
}
