import {Router} from 'express';
import {getHandlerUsers, getHandlerId, updateUser } from '../Handlers/UsersHandlers/getHandlerUsers'
import {userLogin, userCreate} from '../Handlers/UsersHandlers/userLoginHandler'
import { validUserCreate, validUserLog } from '../utils/validateUsers';

const userRouter = Router();

userRouter.get('/user', getHandlerUsers)
userRouter.get('/user/:id', getHandlerId)
userRouter.post('/user/login', validUserLog, userLogin)
userRouter.post('/user/create', validUserCreate, userCreate)
userRouter.put('/user/update/:id', updateUser)

export default userRouter;