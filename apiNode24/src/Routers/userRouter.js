import {Router} from 'express';
import { userController } from '../Controllers/servicesAndControllers.js';
import md from '../middlewares/userMIddlewares.js'
import mid from '../middlewares/middlewares.js'
//import {verifyToken, checkRole} from '../utils/index.js'

const userRouter = Router();

userRouter.get('/user',  mid.validateMethodGet, userController.getAll)
userRouter.get('/user/:id', mid.middUuid, userController.getById)
userRouter.post('/user/login',  md.loginUser, userController.login)
userRouter.post('/user/create',  md.createUser, userController.create)
userRouter.put('/user/update/:id',  mid.middUuid, userController.update)

export default userRouter;