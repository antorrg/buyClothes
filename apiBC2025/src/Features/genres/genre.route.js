import express from 'express'
import { Genre } from '../../Configs/database.js'
import { GeneralRepository } from '../../Shared/Repositories/GeneralRepository.js'
import { BaseService } from '../../Shared/Services/BaseService.js'
import { BaseController } from '../../Shared/Controllers/BaseController.js'
import { GenreDTO, emptyObject } from './GenreDTO.js'

const genRepo = new GeneralRepository(Genre, emptyObject)
const genServ = new BaseService(
  genRepo,
  'Genre',
  'name',
  GenreDTO.parser,
  false,
  null
)

const genCont = new BaseController(genServ)

const genreRouter = express.Router()

genreRouter.post(
  '/create',
  genCont.create
)

genreRouter.get(
  '/',
  genCont.getAll
)

genreRouter.get(
  '/:id',
  genCont.getById
)

genreRouter.put(
  '/:id',
  genCont.update
)

genreRouter.delete(
  '/:id',
  genCont.delete
)

export default genreRouter
