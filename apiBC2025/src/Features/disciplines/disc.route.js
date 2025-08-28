import express from 'express'
import { Discipline } from '../../Configs/database.js'
import { GeneralRepository } from '../../Shared/Repositories/GeneralRepository.js'
import { BaseService } from '../../Shared/Services/BaseService.js'
import { BaseController } from '../../Shared/Controllers/BaseController.js'
import { DiscDTO, emptyObject } from './discDTO.js'

const discRepo = new GeneralRepository(Discipline, emptyObject)

const discServ = new BaseService(
  discRepo,
  'Discipline',
  'name',
  DiscDTO.parser,
  false,
  null
)
const disc = new BaseController(discServ)
const disciplineRouter = express.Router()

disciplineRouter.post(
  '/create',
  disc.create
)

disciplineRouter.get(
  '/',
  disc.getAll
)

disciplineRouter.get(
  '/:id',
  disc.getById
)

disciplineRouter.put(
  '/:id',
  disc.update
)

disciplineRouter.delete(
  '/:id',
  disc.delete
)

export default disciplineRouter
