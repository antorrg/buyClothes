import express from 'express'
import { Product } from '../../Configs/database.js'
import { ProductRepository } from './ProductRepository.js'
import { ProductService } from './ProductService.js'
import { jsonProduct } from './jsonProduct/finalProduct.js'
import { ProductController } from './ProductController.js'
import { ProductDTO } from './ProductDTO.js'
import productVariantRouter from './producVariant/prodVarian.route.js'

const productRep = new ProductRepository(Product, )
export const productService = new ProductService(
    productRep,
    'Product',
    'name',
    ProductDTO.parser,
    false,
    null,
    null,
    jsonProduct
)
const prod = new ProductController(productService)

const productRouter = express.Router()

productRouter.get(
    '/',
prod.getWithPagination
)

productRouter.get(
    '/:id',
    prod.getJsonId
)

productRouter.post(
    '/admin/create',
    prod.create
)

productRouter.get(
    '/admin',
    prod.getadminWithPagination
)

productRouter.get(
    '/admin/:id',
    prod.getById
)

productRouter.put(
    '/admin/:id',
    prod.update
)

productRouter.delete(
    '/admin/:id',
    prod.delete
)

productRouter.use('/admin/var', productVariantRouter)

export default productRouter
