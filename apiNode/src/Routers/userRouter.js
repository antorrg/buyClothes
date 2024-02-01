import {Router} from 'express';
import {getHandlerUsers, getHandlerId, updateUser } from '../Handlers/UsersHandlers/getHandlerUsers'
import {userLogin, userCreate} from '../Handlers/UsersHandlers/userLoginHandler'
import { validUserCreate, validUserLog } from '../utils/validateUsers';
import verifyToken from '../utils/verifyToken.js'

const userRouter = Router();

userRouter.get('/user', getHandlerUsers)
userRouter.get('/user/:id', verifyToken, getHandlerId)
userRouter.post('/user/login', validUserLog, userLogin)
userRouter.post('/user/create', validUserCreate, userCreate)
userRouter.put('/user/update/:id', updateUser)

export default userRouter;