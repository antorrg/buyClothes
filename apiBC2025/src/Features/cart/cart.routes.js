import express from 'express'
import { Validator } from 'req-valid-express'
import { Cart } from '../../Configs/database.js'
import { GeneralRepository } from '../../Shared/Repositories/GeneralRepository.js'
import { BaseService } from '../../Shared/Services/BaseService.js'
import { BaseController } from '../../Shared/Controllers/BaseController.js'
import { CartDTO,  } from './CartDTO.js'
import valid from './schemas/index.js'

const cartRepo = new GeneralRepository(Cart,)
const cartServ = new BaseService(
  cartRepo,
  'Cart',
  'userId',
  CartDTO.parser,
  false,
  null
)
const cart = new BaseController(categoryServ)

const cartRouter = express.Router()

cartRouter.get(
    '/',
    Validator.validateQuery(valid.query),
    cart.getAll
)

cartRouter.get(
    '/:id',
    Validator.paramId('id', Validator.ValidReg.UUIDv4),
    cart.getById
)

cartRouter.post(
    '/create',
    Validator.validateBody(valid.create),
    cart.create
)

cartRouter.put(
    '/:id',
    Validator.paramId('id', Validator.ValidReg.UUIDv4),
    Validator.validateBody(valid.update),
    cart.update
)

cartRouter.delete(
    '/:id',
    Validator.paramId('id', Validator.ValidReg.UUIDv4),
    cart.delete
)

export default cartRouter