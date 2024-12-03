import GenericService from "./genericServices.js";
import * as db from '../database.js'
import eh from '../utils/errors/errorHandlers.js'
import {colorFilter, sizeFilter} from '../Helpers/generalProductHelp.js'


class ProductService extends GenericService{
    constructor(Model, SecondModel,){
        super(Model)// Llamada al constructor de GenericService con el modelo de GeneralProduct
        this.SecondModel = SecondModel; // Se guarda la instancia del modelo Product1
    }
        async create(data) {
        const { name, description, released, category, discipline, genre, trademarck, variants } = data;
        let transaction;
        try {
            transaction = await sequelize.transaction();
             // Verificar si el producto ya existe
        const productFound = await this.Model.findOne({
            where: {name: name.toLowerCase(),},transaction, 
        });

        if (productFound) {
            eh.throwError('This product already exists!!', 400);
        }

            // Crear el nuevo producto general dentro de la transacción
            const newGeneralProduct = await this.Model.create({
                name, description, released
            }, { transaction });

            // Asociar las demás entidades
            await newGeneralProduct.addCategory(category, { transaction });
            await newGeneralProduct.addDiscipline(discipline, { transaction });
            await newGeneralProduct.addGenre(genre, { transaction });
            await newGeneralProduct.addTrademarck(trademarck, { transaction });

            // Crear las variantes
            const createdVariants = await Promise.all(
                variants.map(async (variant) => {
                    const newSecondModel = await this.SecondModel.create({
                        order: variant.order,
                        characteristics: variant.characteristics,
                        images: variant.images,
                        size: variant.size,
                        price: variant.price,
                        stock: variant.stock
                    }, { transaction });

                    // Asociar la variante al producto general
                    await newGeneralProduct.addSecondModel(newSecondModel, { transaction });
                    await newSecondModel.addExtra(variant.extra, { transaction });

                    return newSecondModel;
                })
            );

            // Commit de la transacción
            await transaction.commit();

            return { generalProduct: newGeneralProduct, variants: createdVariants };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    }
    async createVariant( data) {
        const generalProdId = data.generalProdId
        const transaction = await sequelize.transaction();
    
        try {
            // 1. Validar que el producto general exista
            const generalProduct = await this.Model.findByPk(generalProdId, { transaction });
            if (!generalProduct) {
                eh.throwError(`${this.Model.name} not found.`, 400);
            }
    
            // 2. Verificar si ya existe una variante con las mismas características
            const { size, price, stock, characteristics, extraIds } = data;
            const productFound = await this.SecondModel.findOne({
                where: {
                    generalProductId: generalProdId,
                    size,
                    characteristics,
                },
                transaction,
            });
    
            if (productFound) {
                eh.throwError(`A variant with the same size and characteristics already exists.`, 400);
            }
    
            // 3. Crear la variante (Product1)
            const newVariant = await this.SecondModel.create(
                {
                    generalProductId: generalProdId,
                    size,
                    price,
                    stock,
                    characteristics,
                },
                { transaction }
            );
    
            // 4. Asociar Extras si los hay
            if (extraIds && extraIds.length > 0) {
                const extras = await db.Extra.findAll({
                    where: { id: extraIds },
                    transaction,
                });
    
                if (extras.length !== extraIds.length) {
                    eh.throwError("Some extras could not be found.", 400);
                }
    
                await newVariant.addExtras(extras, { transaction });
            }
    
            await transaction.commit();
            return newVariant;
        } catch (error) {
            // Revertir la transacción en caso de error
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    }
     
    async getAll(parserFunction = null, queryObject) {
        const {page, size} = queryObject;
        const pageSize = size;
        const offSet = (page - 1) * pageSize;

        try {
            const { rows: dataFound, count: totalCount } = await this.Model.findAndCountAll({
                limit: pageSize,
                offset: offSet,
                distinct: true,
                include: [
                    { model: db.Category, attributes: ['name'], through: { attributes: [] } },
                    { model: db.Discipline, attributes: ['name'], through: { attributes: [] } },
                    { model: db.Genre, attributes: ['name'], through: { attributes: [] } },
                    { model: db.Trademarck, attributes: ['name'], through: { attributes: [] } },
                    {
                        model: this.SecondModel,
                        include: [
                            { model: db.Extra, attributes: ['name'], through: { attributes: [] } },
                        ],
                    },
                ],
            });

            if (dataFound.length === 0) {
                eh.throwError('Not found. The products table is empty', 404);
            } else {
               
                const data = parserFunction ? dataFound.map(parserFunction) : dataFound
                const totalPages = Math.ceil(totalCount / pageSize);
                const responseData = {
                    info: {
                        count: totalCount,
                        pages: totalPages,
                        currentPage: page,
                    },
                    results: data,
                };
            return {
                cache: false,
                data: responseData}
            }
        } catch (error) {
            throw error;
        }
    }

    async getById(id, parserFunction=null, queryObject) {
        const {size, color} = queryObject;
        try {
            const searchConditions = {};
            if (size) {
                searchConditions.size = size;
            }
            if (color) {
                searchConditions['$Product1.Extra.name$'] = color;
            }
            const sizeClause = sizeFilter(size);
            const colorClause = colorFilter(color);

            // Obtener todos los productos generales con sus variantes y relaciones
            const dataFound = await this.Model.findByPk(id, {
                include: [
                    { model: db.Category, attributes: ['name'], through: { attributes: [] } },
                    { model: db.Discipline, attributes: ['name'], through: { attributes: [] } },
                    { model: db.Genre, attributes: ['name'], through: { attributes: [] } },
                    { model: db.Trademarck, attributes: ['name'], through: { attributes: [] } },
                    {
                        model: this.SecondModel,
                        include: [
                            {
                                model: db.Extra,
                                where: colorClause,
                                attributes: ['name'],
                                through: { attributes: [] },
                            },
                        ],
                        where: sizeClause,
                    },
                ],
            });

            if (!dataFound) {
                eh.throwError('The product was not found', 404);
            }
            return parserFunction ? parserFunction(dataFound) : dataFound;

        } catch (error) {
            throw error;
        }
    }
        // Método para eliminar un producto general y sus variantes (Product1)
    async delete(id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();

            // Buscar el producto general por su ID
            const generalProduct = await this.Model.findByPk(id, { transaction });
            if (!generalProduct) {eh.throwError("GeneralProduct not found!", 404)}

            // Obtener las variantes (Product1) asociadas al producto general
            const variants = await this.SecondModel.findAll({
                where: { generalProductId: generalProduct.id },
                transaction
            });

            // Eliminar las variantes asociadas
            for (const variant of variants) {
                await variant.destroy({ transaction });
            }

            // Eliminar el producto general
            await generalProduct.destroy({ transaction });

            // Commit de la transacción
            await transaction.commit();

            return "Product and its variants successfully deleted." ;
        } catch (error) {
            // En caso de error, revertir la transacción
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    }
}

export default ProductService;
