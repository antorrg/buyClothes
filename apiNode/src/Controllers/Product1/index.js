import {catsCreate,catsGet, catsUpdate,catsDelete,} from './catController.js'
import {extraCreate,extraGet,extraUpdate,extraDelete} from './extraController.js'
import {imgsGet, imgsCreate,imgsUpd, imgsDel} from './imageController.js'
import {ratCreate, ratGet,ratUpdate,ratDelete} from './ratingController.js';
import {sizeCreate,sizeGet,sizeUpdate,sizeDelete} from './sizeController.js'
import createProduct1 from './prodControllers/createProduct.js'
import getProd1ById from '../Product1/prodControllers/getByIdController.js'
import updateProduct1 from '../Product1/prodControllers/updateProduct.js'
import deleteProduct1 from '../Product1/prodControllers/delProdController.js'



export {
    catsCreate,
    catsGet,
    catsUpdate,
    catsDelete,
    extraCreate,
    extraGet,
    extraUpdate,
    extraDelete,
    imgsGet, 
    imgsCreate,
    imgsUpd, 
    imgsDel,
    ratCreate,
    ratGet,
    ratUpdate,
    ratDelete,
    sizeCreate,
    sizeGet,
    sizeUpdate,
    sizeDelete,
    createProduct1,
    getProd1ById,
    updateProduct1,
    deleteProduct1
  
}