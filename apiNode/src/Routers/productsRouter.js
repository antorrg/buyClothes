import {Router} from 'express';
// import getProductsHandler from '../Handlers/ProductHandlers/getProdHandler.js';
// import { createProdHand,getProdByIdHand,updProdHand,delProdHand } from '../Handlers/ProductHandlers/product1hand.js';
import {getHandCategory, postHandCategory,putHandCategory,delHandCategory}from '../Handlers/ProductHandlers/catHand.js'
import {getHandSize,postHandSize,putHandSize,delHandSize}from '../Handlers/ProductHandlers/sizeHand.js'
import {getHandExtras,postHandExtras,putHandExtras,delHandExtras}from '../Handlers/ProductHandlers/extrasHand.js'
import {getHandRating,postHandRating, putHandRating, delHandRating} from '../Handlers/ProductHandlers/ratingHand.js'
import { getHandTrade, postHandTrade, putHandTrade, delHandTrade } from '../Handlers/ProductHandlers/tradeHand.js'
import { getHandDisc, postHandDisc, putHandDisc, delHandDisc } from '../Handlers/ProductHandlers/discipHand.js'
import { getHandGen, postHandGen, putHandGen, delHandGen } from '../Handlers/ProductHandlers/genHand.js'

// import { validUserCreate, validUserLog } from '../utils/validateUsers';

const productsRouter = Router();
//?>>>>>>>>>>>> CRUD Products1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// productsRouter.get('/', getProductsHandler);
// productsRouter.get('/:id', getProdByIdHand);
// productsRouter.post('/', createProdHand);
// productsRouter.put('/:id', updProdHand);
// productsRouter.delete('/:id', delProdHand);
//*========= CRUD Size =============================================
productsRouter.post('/size', postHandSize);
productsRouter.get('/size',getHandSize);
productsRouter.put('/size/:id', putHandSize);
productsRouter.delete('/size/:id', delHandSize);
//*=========CRUD Category ===========================================
productsRouter.post('/cat', postHandCategory);
productsRouter.get('/cat',getHandCategory);
productsRouter.put('/cat/:id', putHandCategory);
productsRouter.delete('/cat/:id', delHandCategory);
//*====== CRUD Extras ==================================================
productsRouter.post('/extras',postHandExtras);
productsRouter.get('/extras',getHandExtras);
productsRouter.put('/extras/:id',putHandExtras);
productsRouter.delete('/extras/:id',delHandExtras);
//*======= CRUD Rating ===============================================
// productsRouter.post('/rating',postHandRating);
// productsRouter.get('/rating',getHandRating);
// productsRouter.put('/rating/:id', putHandRating);
// productsRouter.delete('/rating/:id',delHandRating);
//*======= CRUD Trademarck ===============================================
productsRouter.post('/trade',postHandTrade);
productsRouter.get('/trade',getHandTrade);
productsRouter.put('/trade/:id', putHandTrade);
productsRouter.delete('/trade/:id',delHandTrade);
//*======= CRUD Discipline ===============================================
productsRouter.post('/disc',postHandDisc);
productsRouter.get('/disc',getHandDisc);
productsRouter.put('/disc/:id', putHandDisc);
productsRouter.delete('/disc/:id',delHandDisc);
//*======= CRUD Genre ===============================================
productsRouter.post('/gen',postHandGen);
productsRouter.get('/gen',getHandGen);
productsRouter.put('/gen/:id', putHandGen);
productsRouter.delete('/gen/:id',delHandGen);


export default productsRouter;