import {Router}from 'express'
import userRouter from './userRouter.js';
import productsRouter from './productsRouter.js';

const mainRouter = Router();

mainRouter.use(userRouter)
mainRouter.use(productsRouter)


export default mainRouter;