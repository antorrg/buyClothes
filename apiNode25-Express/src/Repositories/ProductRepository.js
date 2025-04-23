import BaseRepository from "./BaseRepository.js";
import {
  Product,
  ProductVariant,
  Trademark,
  Attributes,
  sequelize,
} from "../Configs/database.js";
import { Op } from "sequelize";
import eh from "../Configs/errorHandlers.js";

const throwError = eh.throwError;
/*
Model: product
ModelVariant: ProductVariant
Model3: trademark
Model4: attributes

*/

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
    this.ModelVariant = ProductVariant;
    this.ModelTrademark = Trademark;
    this.ModelAttributes = Attributes;
  }

  // Métodos privados para filtrado
  selectFilter(value, field) {
    if (!value || !field) return {};
    const formattedField = value || "";

    return {
      [field]: {
        [Op.iLike]: `%${formattedField}%`,
      },
    };
  }

  idStFilter(value) {
    if (!value) return {};

    return {
      id: { [Op.in]: Array.isArray(value) ? value : [value] },
    };
  }

  idFilter(value) {
    if (!value || value.length === 0) return {};
    const formattedField = value ? value.split(",").map(Number) : [];
    return { id: { [Op.in]: formattedField } };
  }

  async create(data) {
    const {
      name,
      description,
      images,
      released,
      category,
      discipline,
      genre,
      trademark,
      variants,
    } = data;
    let t;

    try {
      t = await sequelize.transaction();

      const existingProduct = await this.Model.findOne({
        where: { name },
        transaction: t,
      });

      if (existingProduct) {
        throwError("This product name already exists", 400);
      }

      const newProduct = await this.Model.create(
        {
          name,
          description,
          images,
          released,
        },
        { transaction: t }
      );

      if (trademark) {
        const trademarkFound = await this.ModelTrademark.findByPk(trademark, {
          transaction: t,
        });
        if (!trademarkFound) throwError("This trademark doesn't exist", 404);
        await newProduct.addTrademark(trademarkFound, { transaction: t });
      }

      if (category) {
        const catAttribute = await this.ModelAttributes.findByPk(category, {
          transaction: t,
        });
        if (!catAttribute) throwError("This category doesn't exist", 404);
        await newProduct.addAttribute(catAttribute, {
          through: { type: "Category" },
          transaction: t,
        });
      }

      if (discipline) {
        const discAttribute = await this.ModelAttributes.findByPk(discipline, {
          transaction: t,
        });
        if (!discAttribute) throwError("This discipline doesn't exist", 404);
        await newProduct.addAttribute(discAttribute, {
          through: { type: "Discipline" },
          transaction: t,
        });
      }

      if (genre) {
        const genAttribute = await this.ModelAttributes.findByPk(genre, {
          transaction: t,
        });
        if (!genAttribute) throwError("This genre doesn't exist", 404);
        await newProduct.addAttribute(genAttribute, {
          through: { type: "Genre" },
          transaction: t,
        });
      }

      const createdVariants = [];
      if (variants && Array.isArray(variants)) {
        for (const variantData of variants) {
          const createdVariant = await this.ModelVariant.create(
            {
              ...variantData,
              ProductId: newProduct.id,
            },
            { transaction: t }
          );
          createdVariants.push(createdVariant);
        }
      }

      await t.commit();

      return {
        message: "Product created successfully",
        data: newProduct,
        variants: createdVariants,
      };
    } catch (error) {
      if (t) {
        await t.rollback();
      }
      throw error;
    }
  }

  async getProduct(queryObject, isAdmin = false) {
    const {
      page = 1,
      size,
      name = null,
      trademark = null,
      fields = null,
    } = queryObject;
    const pageSize = size || 3;
    const offSet = (page - 1) * pageSize;

    const searchName = this.selectFilter(name, "name");
    const searchTrade = this.selectFilter(trademark, "name");
    const catFilter = this.idFilter(fields);

    try {
      const { rows: dataFound, count: totalCount } = await this.Model.scope(
        isAdmin ? "allRecords" : "enabledOnly"
      ).findAndCountAll({
        where: searchName,
        limit: pageSize,
        offset: offSet,
        distinct: true,
        include: [
          {
            model: this.ModelTrademark,
            where: searchTrade,
            attributes: ["name", "logo"],
          },
          {
            model: this.ModelAttributes,
            where: catFilter,
            attributes: ["name", "type"],
          },
          {
            model: this.ModelVariant,
            attributes: [
              "id",
              "order",
              "characteristics",
              "price",
              "images",
              "ProductId",
            ],
          },
        ],
      });

      if (dataFound.length === 0) {
        throwError("Not found", 404);
      }

      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        info: {
          count: totalCount,
          pages: totalPages,
          currentPage: parseInt(page),
        },
        results: dataFound,
      };
    } catch (error) {
      throw error;
    }
  }

  async getById(id, size, color, isAdmin) {
    const searchSize = this.selectFilter(size, "size");
    const searchColor = this.selectFilter(color, "color");
    const variantFilter = {};

    if (size) Object.assign(variantFilter, searchSize);
    if (color) Object.assign(variantFilter, searchColor);

    try {
      const data = await this.Model.scope(
        isAdmin ? "allRecords" : "enabledOnly"
      ).findByPk(id, {
        include: [
          {
            model: this.ModelTrademark,
            attributes: [
              "name",
              "metaTitle",
              "metaDescription",
              "metaKeywords",
              "ogImage",
              "twitterCard",
              "logo",
              "officialWebsite",
              "socialMedia",
              "brandStory",
            ],
          },
          {
            model: this.ModelAttributes,
            attributes: ["name", "type"],
          },
          {
            model: this.ModelVariant,
            where: Object.keys(variantFilter).length
              ? variantFilter
              : undefined,
            attributes: [
              "id",
              "order",
              "characteristics",
              "size",
              "color",
              "stock",
              "price",
              "images",
              "ProductId",
            ],
          },
        ],
      });

      if (!data) {
        throwError("Product not found", 404);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async specialUpdate(id, newData) {
    const { category, discipline, genre, trademark } = newData;
    let t;

    try {
      t = await sequelize.transaction();

      const product = await this.Model.findByPk(id, { transaction: t });
      if (!product) throwError("Product not found", 404);

      // Actualizar datos del producto
      // await product.update({ name, description, images, released }, { transaction: t });

      // Actualizar Trademark
      if (trademark) {
        const trademarkFound = await this.ModelTrademark.findByPk(trademark, {
          transaction: t,
        });
        if (!trademarkFound) throwError("This trademark doesn't exist", 404);
        await product.setTrademarks(trademarkFound, { transaction: t });
      }

      // Actualizar Categoría, Disciplina y Género
      const attributesToUpdate = [
        { value: category, type: "Category" },
        { value: discipline, type: "Discipline" },
        { value: genre, type: "Genre" },
      ];

      for (const { value, type } of attributesToUpdate) {
        if (value) {
          const attribute = await this.ModelAttributes.findByPk(value, {
            transaction: t,
          });
          if (!attribute)
            throwError(`This ${type.toLowerCase()} doesn't exist`, 404);
          await product.addAttribute(attribute, {
            through: { type },
            transaction: t,
          });
        }
      }

      await t.commit();
      return { message: "Product updated successfully", data: product };
    } catch (error) {
      if (t) await t.rollback();
      throw error;
    }
  }
}

export default ProductRepository;
