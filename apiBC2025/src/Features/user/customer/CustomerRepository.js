import BaseRepository from '../../../Shared/Repositories/BaseRepository.js'
import eh from '../../../Configs/errorHandlers.js'

export class CustomerRepository extends BaseRepository {
  constructor (Model, dataEmpty = null) {
    super(Model, dataEmpty)
  }

  async getOne (data, uniqueField) {
    try {
      const whereClause = {}
      if (uniqueField) {
        whereClause[uniqueField] = data
      }
      const existingRecord = await this.Model.findOne({ where: whereClause })
      if (existingRecord === null) {
        return 'No hay registro'
      }
      return existingRecord
    } catch (error) {
      eh.processError(error, 'Customer get error')
    }
  };
}
