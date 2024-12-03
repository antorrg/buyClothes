import * as db from '../database.js';
import GenericService from '../Classes/genericServices.js'
import GenericController from '../Classes/genericController.js';
import * as parser from '../Helpers/parsers.js'
import parserUser from '../Helpers/parserUser.js'
import UserService from '../Classes/userService.js';
import ProductService from '../Classes/GeneralProductServices.js';
import Product1Service from '../Classes/Product1Service.js';
import { generalProductParser, product1Parser } from '../Helpers/generalProductParser..js';


//Funciones de servicios con su correspondiente controlador:
const categoryService = new GenericService(db.Category);
export const category = new GenericController(categoryService, parser.generalParser)

const disciplineService = new GenericService(db.Discipline)
export const discipline = new GenericController(disciplineService, parser.generalParser)

const extraService = new GenericService(db.Extra);
export const extra = new GenericController(extraService, parser.generalParser)

const ratingService = new GenericService(db.Rating)
export const rating = new GenericController(ratingService, parser.ratingParser)

const companyService = new GenericService(db.Company, false, true)
export const company = new GenericController(companyService, parser.companyParser, false)

const salesService = new GenericService(db.Sales)
export const sales = new GenericController(salesService, parser.salesParser)

export const trademarkService = new GenericService(db.Trademarck)
export const trademarck = new GenericController(trademarkService, parser.generalParser)

export const genreService = new GenericService(db.Genre)
export const genre = new GenericController(genreService, parser.generalParser)

//*######## Funciones y controladores de general product y product1:

export const productService = new Product1Service(db.Product1)
export const product1 = new GenericController(productService, product1Parser)

export const generalProductService = new ProductService(db.GeneralProduct, db.Product1,)
export const generalProduct = new GenericController(generalProductService, generalProductParser)


//*%%%%%%%% Funciones y controlador de usuario: 

export const usersService = new UserService(db.User, false, true)

export const userController = new GenericController(usersService, parserUser)

