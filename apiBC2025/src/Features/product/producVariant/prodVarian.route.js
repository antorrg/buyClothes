import express from 'express'
import { ProductVariant } from '../../../Configs/database.js'
import { VariantRepository } from './VariantRepository.js'
import { BaseService } from '../../../Shared/Services/BaseService.js'
import { BaseController } from '../../../Shared/Controllers/BaseController.js'
import { VariantDTO, emptyObject } from './VariantDTO.js'

const varRepo = new VariantRepository(ProductVariant, emptyObject)
export const varServ = new BaseService(
  varRepo,
  'Variant',
  'order',
  VariantDTO.parser,
  false,
  null
)
const variant = new BaseController(varServ)

const productVariantRouter = express.Router()

productVariantRouter.post(
  '/create',
  variant.create
)

productVariantRouter.get(
  '/',
  variant.getAll
)

productVariantRouter.get(
  '/:id',
  variant.getById
)

productVariantRouter.put(
  '/:id',
  variant.update
)

productVariantRouter.delete(
  '/:id',
  variant.delete
)

export default productVariantRouter
