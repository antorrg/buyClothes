import { FinalProduct } from '../../../Configs/database.js'
import { JsonRepository } from './JsonRepository.js'
import { JsonService } from './JsonService.js'
import { JsonDTO } from './JsonDTO.js'

export const finalRepository = new JsonRepository(FinalProduct)
export const jsonProduct = new JsonService(
    finalRepository,
    'FinalProduct',
    'productId',
    JsonDTO.parser,
)
