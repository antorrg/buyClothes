import express from 'express'
import { Category } from '../../Configs/database.js'
import { GeneralRepository } from '../../Shared/Repositories/GeneralRepository.js'
import { BaseService } from '../../Shared/Services/BaseService.js'
import { BaseController } from '../../Shared/Controllers/BaseController.js'
import { CatDTO, emptyObject } from './CatDTO.js'

const catRepo = new GeneralRepository(Category, emptyObject)
const categoryServ = new BaseService(
  catRepo,
  'Category',
  'name',
  CatDTO.parser,
  false,
  null
)
const cat = new BaseController(categoryServ)

const categoryRouter = express.Router()

categoryRouter.post(
  '/create',
  cat.create
)

categoryRouter.get(
  '/',
  cat.getAll
)

categoryRouter.get(
  '/:id',
  cat.getById
)

categoryRouter.put(
  '/:id',
  cat.update
)

categoryRouter.delete(
  '/:id',
  cat.delete
)

export default categoryRouter
