import {Router} from 'express';
import getProductsHandler from '../Handlers/ProductHandlers/getProdHandler.js';
import {getHandCategory, postHandCategory,putHandCategory,delHandCategory}from '../Handlers/ProductHandlers/catHand.js'
import {getHandExtras,postHandExtras,putHandExtras,delHandExtras}from '../Handlers/ProductHandlers/extrasHand.js'
import {getHandRating,postHandRating, putHandRating, delHandRating} from '../Handlers/ProductHandlers/ratingHand.js'
import { getHandTrade, postHandTrade, putHandTrade, delHandTrade } from '../Handlers/ProductHandlers/tradeHand.js'
import { getHandDisc, postHandDisc, putHandDisc, delHandDisc } from '../Handlers/ProductHandlers/discipHand.js'
import { getHandGen, postHandGen, putHandGen, delHandGen } from '../Handlers/ProductHandlers/genHand.js'
import {generalCreateHandler, generalGetHandler, generalGetByIdHandler, generalUpdateHandler, generalDeleteHandler} from '../Handlers/ProductHandlers/generalProductHandler.js';
import { validCreateProduct } from '../utils/index.js';

const productsRouter = Router();
//?>>>>>>>>>>>> CRUD GeneralProduct <<<<<<<<<<<<<<<<<<<<<<<<
productsRouter.get('/', generalGetHandler);
productsRouter.get('/:id', generalGetByIdHandler);
productsRouter.post('/', validCreateProduct, generalCreateHandler);
// productsRouter.put('/:id', generalUpdateHandle);
// productsRouter.delete('/:id', generalDeleteHandler);
//?>>>>>>>>>>>> CRUD Products1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
productsRouter.get('/depend/', getProductsHandler);
//*=========CRUD Category ===========================================
productsRouter.post('/sub/cat', postHandCategory);
productsRouter.get('/sub/cat',getHandCategory);
productsRouter.put('/sub/cat/:id', putHandCategory);
productsRouter.delete('/sub/cat/:id', delHandCategory);
//*====== CRUD Extras ==================================================
productsRouter.post('/sub/extras', postHandExtras);
productsRouter.get('/sub/extras',getHandExtras);
productsRouter.put('/sub/extras/:id',putHandExtras);
productsRouter.delete('/sub/extras/:id',delHandExtras);
//*======= CRUD Rating ===============================================
productsRouter.post('/sub/rating',postHandRating);
productsRouter.get('/sub/rating',getHandRating);
productsRouter.put('/sub/rating/:id', putHandRating);
productsRouter.delete('/sub/rating/:id',delHandRating);
//*======= CRUD Trademarck ===============================================
productsRouter.post('/sub/trade',postHandTrade);
productsRouter.get('/sub/trade',getHandTrade);
productsRouter.put('sub/trade/:id', putHandTrade);
productsRouter.delete('/sub/trade/:id',delHandTrade);
//*======= CRUD Discipline ===============================================
productsRouter.post('/sub/disc',postHandDisc);
productsRouter.get('/sub/disc',getHandDisc);
productsRouter.put('/sub/disc/:id', putHandDisc);
productsRouter.delete('/sub/disc/:id',delHandDisc);
//*======= CRUD Genre ===============================================
productsRouter.post('/sub/gen',postHandGen);
productsRouter.get('/sub/gen',getHandGen);
productsRouter.put('/sub/gen/:id', putHandGen);
productsRouter.delete('/sub/gen/:id',delHandGen);




export default productsRouter;