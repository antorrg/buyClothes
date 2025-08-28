import BaseRepository from './BaseRepository.js'

export class GeneralRepository extends BaseRepository {
  constructor (Model, dataEmpty = null) {
    super(Model, dataEmpty)
  }
}
