import {Router} from 'express';
import { userController } from '../Controllers/servicesAndControllers.js';
//import { validUserCreate, validUserLog } from '../utils/validateUsers.js';
//import {verifyToken, checkRole} from '../utils/index.js'

const userRouter = Router();

userRouter.get('/user', userController.getAll)
userRouter.get('/user/:id', userController.getById)
userRouter.post('/user/login', userController.login)
userRouter.post('/user/create', userController.create)
userRouter.put('/user/update/:id', userController.update)

export default userRouter;