import express from 'express'
import userRouter from './userRouter.js';
import productsRouter from './productsRouter.js';

const mainRouter = express.Router();

mainRouter.use(userRouter)
mainRouter.use(productsRouter)


export default mainRouter;