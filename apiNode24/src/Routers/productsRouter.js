import express from 'express';
import {generalProduct, product1, category, extra, rating, trademarck, discipline, genre, company  } from '../Controllers/servicesAndControllers.js'
import mid from '../middlewares/middlewares.js'

const productsRouter = express.Router();
//?>>>>>>>>>>>> CRUD GeneralProduct <<<<<<<<<<<<<<<<<<<<<<<<
productsRouter.get('/', mid.genProdGetAll, generalProduct.getAll);
productsRouter.get('/:id', generalProduct.getById);
productsRouter.post('/', generalProduct.create);
// productsRouter.put('/:id', generalUpdateHandle);
// productsRouter.delete('/:id', generalDeleteHandler);
//?>>>>>>>>>>>> CRUD Products1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
productsRouter.get('/depend/', product1.getAll);
productsRouter.put('/depend/:id', product1.update);
productsRouter.get('/depend/:id', product1.getById);
//*=========CRUD Category ===========================================
productsRouter.post('/sub/cat', category.create);
productsRouter.get('/sub/cat',category.getAll);
productsRouter.put('/sub/cat/:id', category.update);
productsRouter.delete('/sub/cat/:id', category.delete);
//*====== CRUD Extras ==================================================
productsRouter.post('/sub/extras', extra.create);
productsRouter.get('/sub/extras',extra.getAll);
productsRouter.put('/sub/extras/:id', extra.update);
productsRouter.delete('/sub/extras/:id',extra.delete);
//*======= CRUD Rating ===============================================
productsRouter.post('/sub/rating',rating.create);
productsRouter.get('/sub/rating',rating.getAll);
productsRouter.put('/sub/rating/:id', rating.update);
productsRouter.delete('/sub/rating/:id',rating.delete);
//*======= CRUD Trademarck ===============================================
productsRouter.post('/sub/trade',trademarck.create);
productsRouter.get('/sub/trade',trademarck.getAll);
productsRouter.put('sub/trade/:id', trademarck.update);
productsRouter.delete('/sub/trade/:id',trademarck.delete);
//*======= CRUD Discipline ===============================================
productsRouter.post('/sub/disc',discipline.create);
productsRouter.get('/sub/disc',discipline.getAll);
productsRouter.put('/sub/disc/:id', discipline.update);
productsRouter.delete('/sub/disc/:id',discipline.delete);
//*======= CRUD Genre ===============================================
productsRouter.post('/sub/gen',genre.create);
productsRouter.get('/sub/gen',genre.getAll);
productsRouter.put('/sub/gen/:id', genre.update);
productsRouter.delete('/sub/gen/:id',genre.delete);
//*====== CRUD Company ==================================================
productsRouter.post('/sub/company/create', company.create);
productsRouter.get('/sub/company',company.getAll);
productsRouter.put('/sub/company/:id', company.update);
productsRouter.delete('/sub/company/:id',company.delete);



export default productsRouter;