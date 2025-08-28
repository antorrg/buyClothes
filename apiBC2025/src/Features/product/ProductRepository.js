import BaseRepository from '../../Shared/Repositories/BaseRepository.js';
import { Op } from 'sequelize';
import { Product, ProductVariant, Category, Discipline, Genre, Trademark, sequelize } from '../../Configs/database.js';
import eh from '../../Configs/errorHandlers.js';

export class ProductRepository extends BaseRepository {
  constructor(Model, dataEmpty = null) {
    super(Model, dataEmpty);
  }

  async create(data) {
    const { name, code, description, picture, released, trademark, category, discipline, genre, variants } = data;
    let t;
    try {
      t = await sequelize.transaction();

      const dataFound = await this.Model.findOne({ where: { name }, transaction: t });
      if (dataFound) {
        eh.throwError('This product already exists!!', 400);
      }
      

      const newProduct = await this.Model.create({ name, code, picture, description, released: new Date(released) }, { transaction: t });

      await newProduct.addCategory(category, { transaction: t });
      await newProduct.addDiscipline(discipline, { transaction: t });
      await newProduct.addGenre(genre, { transaction: t });
      await newProduct.addTrademark(trademark, { transaction: t });

      const ProductId = newProduct.id;

      const createdVariants = await Promise.all(
        variants.map(variant =>
          ProductVariant.create({ ProductId, ...variant }, { transaction: t })
        )
      );
      await t.commit();
      return { product: newProduct, variants: createdVariants };
    } catch (error) {
      if (t) await t.rollback();
      throw error;
    }
  }

  async getWithPagination(queryObject, isAdmin = false) {
    try{
    const {
      page = 1,
      limit = 10,
      searchField = '',
      search = null,
      sortBy = 'id',
      order = 'DESC',
      filters = {}
    } = queryObject;

    const offset = (page - 1) * limit;
    
    const searchFilter =
      search && searchField
        ? { [searchField]: { [Op.iLike]: `%${search}%` } }
        : {};

    const whereClause = { ...filters, ...searchFilter };

    const { rows: existingRecords, count: total } =
      await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findAndCountAll({
        limit,
        offset,
        where: whereClause,
        distinct: true,
        order: [[sortBy, order]],
        include: [
          { model: Category, attributes: ['name'], through: { attributes: [] }, required: false},
          { model: Discipline, attributes: ['name'], through: { attributes: [] }, required: false },
          { model: Genre, attributes: ['name'], through: { attributes: [] }, required: false },
          { model: Trademark, attributes: ['name'], through: { attributes: [] }, required: false }
        ]
      });

    if (existingRecords.length === 0) {
      if (this.dataEmpty) {
        existingRecords.push(this.dataEmpty);
      } else {
        eh.throwError(
          `This ${this.Model.name.toLowerCase()} ${searchField || 'entry'} does not exist`,
          404
        );
      }
    }

    return {
      info: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      },
      data: existingRecords
    };
  }catch(error){
    eh.processError(error, 'ProdRep Get')
  }
  }

  async getById(id, isAdmin= false) {
    const dataFound = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findByPk(id, {
      include: [
        { model: Category, attributes: ['name'], through: { attributes: [] },required: false  },
        { model: Discipline, attributes: ['name'], through: { attributes: [] },required: false  },
        { model: Genre, attributes: ['name'], through: { attributes: [] },required: false  },
        { model: Trademark, attributes: ['name'], through: { attributes: [] },required: false  },
        { 
        model: ProductVariant,
        attributes: ['id', 'ProductId', 'order', 'characteristics', 'images', 'size', 'color', 'price', 'stock', 'enabled'], 
        required: false // evita que excluya el producto si no tiene variantes
      }
      ]
    });

    if (!dataFound) {
      eh.throwError(`Product with ID ${id} not found`, 404);
    }
    return dataFound;
  }
}

