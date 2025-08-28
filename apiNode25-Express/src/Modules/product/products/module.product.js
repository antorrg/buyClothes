import { ProductVariant } from "../../../Configs/database.js";
import GeneralRepository from "../../../Repositories/GeneralRepository.js";
import ProductRepository from "../../../Repositories/ProductRepository.js";
import GeneralService from "../../../Services/GeneralService.js";
import ProductService from "../../../Services/ProductService.js";
import GeneralController from "../../../Controllers/GeneralController.js";
import MiddlewareHandler from "../../../Middlewares/MiddlewareHandler.js";
import ProdHelp from "../helpers/prodHelp.js";

const productRep = new ProductRepository();

const variantRep = new GeneralRepository(ProductVariant);

// Repository, fieldName, useCache = false, parserFunction = null, useImage = false, deleteImages = null
const productServ = new ProductService(
  productRep,
  "name",
  false,
  ProdHelp.parseProduct,
  false,
  null
);

const variantServ = new GeneralService(
  variantRep,
  "order",
  false,
  null,
  false,
  null
);

const product = new GeneralController(productServ);

const variant = new GeneralController(variantServ);

export default {
  productCreate: product.create,
  productGetAll: product.getAll,
  productById: product.getById,
  productUpdate: product.update,
  productDelete: product.delete,
  variantCreate: variant.create,
  variantUpdate: variant.update,
  variantDelete: variant.delete,
};
