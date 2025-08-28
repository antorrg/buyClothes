import BaseRepository from '../../Shared/Repositories/BaseRepository.js'
import eh from '../../Configs/errorHandlers.js'

export class UserRepository extends BaseRepository {
  constructor (Model, dataEmpty = null) {
    super(Model, dataEmpty)
  }

  async findById (id) {
    try {
      const data = await this.Model.findByPk(id)
      if (data === null) return null
      return data
    } catch (error) {
      eh.processError(error, 'UserRepository')
    }
  }
}
