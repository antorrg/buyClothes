import express from 'express'
import { Trademark } from '../../Configs/database.js'
import { GeneralRepository } from '../../Shared/Repositories/GeneralRepository.js'
import { BaseService } from '../../Shared/Services/BaseService.js'
import { BaseController } from '../../Shared/Controllers/BaseController.js'
import { TradeDTO, emptyObject } from './tradedTO.js'

const tradeRepo = new GeneralRepository(Trademark, emptyObject)
const tradeServ = new BaseService(
  tradeRepo,
  'Trademark',
  'name',
  TradeDTO.parser,
  false,
  null
)
const tradeCont = new BaseController(tradeServ)

const tradeRouter = express.Router()

tradeRouter.post(
  '/create',
  tradeCont.create
)

tradeRouter.get(
  '/',
  tradeCont.getAll
)

tradeRouter.get(
  '/:id',
  tradeCont.getById
)

tradeRouter.put(
  '/:id',
  tradeCont.update
)

tradeRouter.delete(
  '/:id',
  tradeCont.delete
)

export default tradeRouter
