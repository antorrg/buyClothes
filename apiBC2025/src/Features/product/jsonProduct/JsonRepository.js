import BaseRepository from '../../../Shared/Repositories/BaseRepository.js'
import eh from '../../../Configs/errorHandlers.js'
  import { Op, Sequelize } from 'sequelize'

export class JsonRepository extends BaseRepository {
  constructor (Model, dataEmpty = null) {
    super(Model, dataEmpty)
  }
    async getAll () {
      const response = await this.Model.findAll()
      return response
    }

async getWithPagination(queryObject) {
  const {
    searchField = '',
    search = null,
    sortBy = 'id',
    order = 'DESC',
    page = 1,
    limit = 10,
    filters = {}
  } = queryObject

  const offset = (page - 1) * limit

  // 🔹 Filtro por búsqueda libre en un campo JSONB
  let searchFilter = {}
  if (search && searchField) {
    // Para campos que están dentro del JSONB "product"
    searchFilter = Sequelize.where(
      Sequelize.json(`product.${searchField}`),
      { [Op.iLike]: `%${search}%` }
    )
  }

  // 🔹 Filtros directos (category, trademark, genre, discipline)
  const jsonFilters = []
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      jsonFilters.push(
        Sequelize.where(
          Sequelize.json(`product.${key}`),
          { [Op.iLike]: `%${value}%` }
        )
      )
    }
  }

  // 🔹 Construir cláusula WHERE final
  const whereClause = {
    [Op.and]: [
      ...(searchFilter ? [searchFilter] : []),
      ...jsonFilters
    ]
  }

  const { rows: existingRecords, count: total } = await this.Model.findAndCountAll({
    limit,
    offset,
    where: whereClause,
    distinct: true,
    order: [[sortBy, order]]
  })

  if (existingRecords.length === 0) {
    if (this.dataEmpty) {
      existingRecords.push(this.dataEmpty)
    } else {
      eh.throwError(`This ${this.Model.name.toLowerCase()} ${searchField || 'entry'} do not exists`, 404)
    }
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

  
    async getOne (data, uniqueField,) {
      try {
        const whereClause = {}
        if (uniqueField) {
          whereClause[uniqueField] = data
        }
        const existingRecord = await this.Model.findOne({ where: whereClause })
        if (!existingRecord) {
         return null
        }
        return existingRecord
      } catch (error) {
        throw error
      }
    };
  
}
