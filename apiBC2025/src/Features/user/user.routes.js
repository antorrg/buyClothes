import express from 'express'
import { Validator } from 'req-valid-express'
import { User } from '../../Configs/database.js'
import { UserRepository } from './UserRepository.js'
import { UserService } from './UserService.js'
import { UserController } from './UserController.js'
import { customerService } from './customer/customer.routes.js'
import vld from './validHelpers/index.js'
import { UserDTO, dataEmpty } from './UserDTO.js'
import FirebaseServices from '../../ExternalServices/FirebaseServices.js'
import envConfig from '../../Configs/envConfig.js'
import * as mock from '../../../test/generalFunctions.js'

const setRoles = (envConfig.Status === 'test') ? mock.setUserRolMock : FirebaseServices.setUserRole
const userRep = new UserRepository(User, dataEmpty)
export const userService = new UserService(
  userRep,
  'User',
  'email',
  UserDTO.parser,
  false, // useImages (boolean)
  null, // funcion de images (function)
  setRoles, // metodo de cambio de rol (firebase)
  customerService.getById.bind(customerService)//
)
const userController = new UserController(userService)

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const userRouter = express.Router()

userRouter.post(
  '/login',
  Validator.validateBody(vld.userCreate),
  userController.create
)
userRouter.get('/',
  userController.getAll
)
userRouter.get(
  '/pages',
  Validator.validateQuery(vld.userQueries),
  userController.getWithPagination
)
userRouter.get('/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  userController.getById
)
userRouter.put(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  Validator.validateBody(vld.userUpdate),
  Validator.validateRegex(regexEmail, 'email'),
  userController.update
)
userRouter.patch(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  Validator.validateBody(vld.userUpdate),
  Validator.validateRegex(regexEmail, 'email'),
  userController.upgrade
)
userRouter.delete(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  userController.delete
)

export default userRouter
