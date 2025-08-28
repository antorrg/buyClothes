import express from 'express'
import { Customer } from '../../../Configs/database.js'
import { CustomerRepository } from './CustomerRepository.js'
import { CustomerService } from './CustomerService.js'
import { BaseController } from '../../../Shared/Controllers/BaseController.js'
// import vld from './validHelpers/index.js'
import { CustomerDTO, dataEmpty } from './CustomerDTO.js'

const customRep = new CustomerRepository(Customer, dataEmpty)
export const customerService = new CustomerService(customRep, 'Customer', 'userId', CustomerDTO.parser, false, null)
const custom = new BaseController(customerService)

const customerRouter = express.Router()

customerRouter.post(
  '/create',
  custom.create
)

customerRouter.get('/:id',
  custom.getById
)
customerRouter.put(
  '/:id',
  custom.update
)

export default customerRouter
