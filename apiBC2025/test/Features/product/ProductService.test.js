import {productService} from '../../../src/Features/product/product.route.js'
import {startApp, closeDatabase} from '../../../src/Configs/database.js'
import { fillTables } from '../../testHelpers/Product-helpers/productHelp.js'
import * as info from '../../testHelpers/Product-helpers/data/index.js'
import * as store from '../../testHelpers/testStore.help.js'


describe('ProductService integration test', () => { 
    beforeAll(async()=>{
        await startApp(true, true)
        await fillTables()
    })
    afterAll(async()=>{
        await closeDatabase()
    })
    describe('Product creation', () => { 
        it('should create a Product with correct data', async() => { 
            const data = info.product
            const test = await productService.create(data)
            expect(test.message).toBe('Product create successfully')
        })
     })
    describe('Product Get ', () => {
        it('should retrieve an array of products', async() => {
            const query = {page:1, limit:10,  searchField : '', search : null, sortBy : 'name', order : 'DESC',filters : {}}
            const test = await productService.getWithPagination(
              query
            )
            //console.log('resultado:', test.results.data[0])
            expect(test.message).toBe('Products found successfully')
            expect(test.results.info).toEqual({"page": 1, "total": 1, "totalPages": 1})
            expect(test.results.data).toEqual([
                {
                    id: expect.any(String),
                    name: 'Producto general uno',
                    code: "zzzzz",
                    description: 'Descripción del Producto General',
                    picture: "http://imagen.png",
                    released: "2024-02-17",
                    Category: "Chalecos",
                    Discipline: "Moda",
                    Genre: "hombre",
                    Trademark: "BILLABONG",
                    enabled: true
                }
            ])
            store.setStringId(test.results.data[0].id)
        })
      it('should retrieve an element by id', async() => {
         const test = await productService.getById(store.getStringId())
         expect(test.message).toBe('Product found successfully')
         //console.log(test.results)
         expect(test.results).toEqual({
      id: expect.any(String),
      name: 'Producto general uno',
      description: 'Descripción del Producto General',
      code: "zzzzz",
      picture: "http://imagen.png",
      released: '2024-02-17',
      Category: 'Chalecos',
      Discipline: 'Moda',
      Genre: 'hombre',
      Trademark: 'BILLABONG',
      enabled: true,
      variants: [
        {
          id: expect.any(String),
          ProductId: expect.any(String),
          order: 1,
          characteristics: 'Características de la Variante 1',
          images:  [ 
            "https:imagen.jpg",
            "https:imagen.jpg",
            "https:imagen.jpg",
            "https:imagen.jpg",
            ],
          size: '38',
          color: 'blanco',
          price: '19.99',
          stock: 100,
          enabled: true
        },
        {
          id: expect.any(String),
          ProductId: expect.any(String),
          order: 2,
          characteristics: 'Características de la Variante 2',
          images:  [ 
            "https:imagen.jpg",
            "https:imagen.jpg",
            "https:imagen.jpg",
            "https:imagen.jpg",
            ],
          size: '40',
          color: 'beige',
          price: '24.99',
          stock: 50,
          enabled: true
        },
        {
          id: expect.any(String),
          ProductId: expect.any(String),
          order: 3,
          characteristics: 'Características de la Variante 3',
          images:  [ 
            "https:imagen.jpg",
            "https:imagen.jpg",
            "https:imagen.jpg",
            "https:imagen.jpg",
            ],
          size: '40',
          color: 'negro',
          price: '24.99',
          stock: 50,
          enabled: true
        }
      ]
    })
      })
      
    })
    describe('JsonProduct functions', () => {
        it('should retrieve an element by id', async() => {
         const test = await productService.getJson(store.getStringId())
         //console.log(test)
         expect(test).toEqual(info.jsonResponse)
        // console.log(test.results.variants)
      })
    })
})