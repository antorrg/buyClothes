import eh from '../../Configs/errorHandlers.js'
import { Op } from 'sequelize'

const throwError = eh.throwError
// Esto es lo mas parecido a una clase abstracta, no se puede instanciar, solo se puede extender.

export default class BaseRepository {
  constructor (Model, dataEmpty = null) {
    if (new.target === BaseRepository) {
      throw new Error('Cannot instantiate an abstract class')
    }
    this.Model = Model
    this.dataEmpty = dataEmpty
  }

  async create (data, uniqueField) {
    try {
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
    } catch (error) {
      throw error
    }
  }

  async getAll (isAdmin = false) {
    const response = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findAll()
    return response
  }

  async getWithPagination (queryObject, isAdmin = false) {
    const { searchField = '', search = null, sortBy = 'id', order = 'DESC', page = 1, limit = 10, filters = {} } = queryObject
    const offset = (page - 1) * limit
    const searchFilter = search && searchField ? { [searchField]: { [Op.iLike]: `%${search}%` } } : {}
    // Combinamos filtros personalizados con búsqueda
    const whereClause = { ...filters, ...searchFilter }
    const { rows: existingRecords, count: total } = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findAndCountAll({
      limit,
      offset,
      where: whereClause,
      distinct: true,
      order: [[sortBy, order]]
    })
    if (existingRecords.length === 0) {
      if (this.dataEmpty) {
        existingRecords.push(this.dataEmpty)
      } else { throwError(`This ${this.Model.name.toLowerCase()} ${searchField || 'entry'} do not exists`, 404) }
    }

    return {
      info: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      },
      data: existingRecords
    }
  }

  async getOne (data, uniqueField, isAdmin = true) {
    try {
      const whereClause = {}
      if (uniqueField) {
        whereClause[uniqueField] = data
      }
      const existingRecord = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findOne({ where: whereClause })
      if (!existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
      }
      return existingRecord
    } catch (error) {
      throw error
    }
  };

  async getById (id) {
    try {
      const existingRecord = await this.Model.findByPk(id)
      if (!existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
      }
      return existingRecord
    } catch (error) {
      throw error
    }
  };

  async update (id, data) {
    const dataFound = await this.Model.findByPk(id)
    if (!dataFound) {
      throwError(`${this.Model.name} not found`, 404)
    }
    const upData = await dataFound.update(data)
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

  async addRelation (modelInstance, relatedModel, items) {
    return modelInstance[`add${relatedModel}`](items)
  }

  async setRelation (modelInstance, relatedModel, items) {
    return modelInstance[`set${relatedModel}`](items)
  }

  async removeRelation (modelInstance, relatedModel, items) {
    return modelInstance[`remove${relatedModel}`](items)
  }
}
// ? Ejemplo de uso (para recordar)
// ? await productService.addRelation(product, 'Categories', [category1, category2]);
