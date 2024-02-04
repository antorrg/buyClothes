import {Router} from 'express';
import getProductsHandler from '../Handlers/ProductHandlers/getProdHandler.js';
import { createProdHand,getProdByIdHand,updProdHand,delProdHand } from '../Handlers/ProductHandlers/product1hand.js';
// import { validUserCreate, validUserLog } from '../utils/validateUsers';

const productsRouter = Router();
//>>>>>>>>>>>> CRUD Products1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
productsRouter.get('/', getProductsHandler)
productsRouter.get('/:id', getProdByIdHand)
productsRouter.post('/', createProdHand)
productsRouter.put('/:id', updProdHand)
productsRouter.delete('/:id', delProdHand)
//========= CRUD Images =========================================
// productsRouter.post()
// productsRouter.get()
// productsRouter.get()
// productsRouter.put()
// productsRouter.delete()

export default productsRouter;