import {Router}from 'express'
import userRouter from './userRouter';
import adminRouter from './adminRouter';

const mainRouter = Router();

mainRouter.use(userRouter)
//mainRouter.use(prodRouter)


export default mainRouter;