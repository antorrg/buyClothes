import eh from '../Configs/errorHandlers.js'

const throwError = eh.throwError
// Esto es lo mas parecido a una clase abstracta, no se puede instanciar, solo se puede extender.

class BaseRepository {
  constructor (Model) {
    if (new.target === BaseRepository) {
      throw new Error('No se puede instanciar una clase abstracta.')
    }
    this.Model = Model
  }

  async create (data, uniqueField) {
    // console.log(data[uniqueField])

    const whereClause = {}
    if (uniqueField) {
      whereClause[uniqueField] = data[uniqueField]
    }
    const existingRecord = await this.Model.findOne({ where: whereClause })
    if (existingRecord) {
      throwError(`This ${this.Model.name.toLowerCase()} ${uniqueField || 'entry'} already exists`, 400)
    }
    const newRecord = await this.Model.create(data)

    return newRecord
  }

  async getAll (isAdmin, dataEmpty = null) {
    const existingRecord = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findAll()
    if (existingRecord.length === 0) {
      if (dataEmpty) {
        existingRecord.push(dataEmpty)// return [dataEmpty]
      } else {return {message: 'No data yet'} }
    }
    return existingRecord
  }

  async getOne (data, uniqueField, isAdmin) {
    const whereClause = {}
    if (uniqueField) {
      whereClause[uniqueField] = data
    }
    const existingRecord = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findOne({ where: whereClause })
    if (!existingRecord) {
      throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
    }
    return existingRecord
  };

  async getById (id, isAdmin) {
    const existingRecord = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findByPk(id)
    if (!existingRecord) {
      throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
    }
    return existingRecord
  };

  async update (id, newData) {
    const dataFound = await this.Model.findByPk(id)
    if (!dataFound) {
      throwError(`${this.Model.name} not found`, 404)
    }
    const upData = await dataFound.update(newData)
    return upData
  };

  async delete (id) {
    const dataFound = await this.Model.findByPk(id)
    if (!dataFound) {
      throwError(`${this.Model} not found`, 404)
    }
    await dataFound.destroy()
    return `${this.Model.name} deleted successfully`
  };
}

export default BaseRepository
