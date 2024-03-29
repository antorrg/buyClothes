import {Router} from 'express';
import {getHandlerUsers, getHandlerId, updateUser } from '../Handlers/UsersHandlers/getHandlerUsers.js'
import {userLogin, userCreate} from '../Handlers/UsersHandlers/userLoginHandler.js'
import { validUserCreate, validUserLog } from '../utils/validateUsers.js';
import {verifyToken, checkRole} from '../utils/index.js'

const userRouter = Router();

userRouter.get('/user', getHandlerUsers)
userRouter.get('/user/:id', verifyToken, checkRole([0,2]), getHandlerId)
userRouter.post('/user/login', validUserLog, userLogin)
userRouter.post('/user/create', validUserCreate, userCreate)
userRouter.put('/user/update/:id', updateUser)

export default userRouter;