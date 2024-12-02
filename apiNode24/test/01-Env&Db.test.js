import env from '../src/envConfig.js'
import * as db from '../src/database.js'



describe('Iniciando tests, probando variables de entorno del archivo "envConfig.js" y existencia de tablas en DB.',()=>{
    afterAll(()=>{
     console.log('Finalizando todas las pruebas...')
    })
    
    it('Deberia retornar el estado y la variable de base de datos correcta', ()=>{
        const formatEnvInfo =`Servidor corriendo en: ${env.Status}\n` +
                   `Base de datos de testing: ${env.DbConnect}`
     expect(formatEnvInfo).toBe(`Servidor corriendo en: test\n` +
        `Base de datos de testing: postgres://postgres:antonio@localhost:5432/testing`)
    })
    
    it('Deberia responder a una consulta en la base de datos con un arreglo vacío', async()=>{
        const users = await db.User.findAll()
        const products = await db.GeneralProduct.findAll()
        const items = await db.Product1.findAll()
        const extra = await db.Extra.findAll()
        const rating = await db.Rating.findAll()
        const comp = await db.Company.findAll()
        const sales = await db.Sales.findAll()
        const trade = await db.Trademarck.findAll()
        const genre = await db.Genre.findAll()
        const disc = await db.Discipline.findAll()
        expect(users).toEqual([]);
        expect(products).toEqual([]);
        expect(items).toEqual([]);
        expect(extra).toEqual([])
        expect(rating).toEqual([])
        expect(comp).toEqual([])
        expect(trade).toEqual([])
        expect(genre).toEqual([])
        expect(disc).toEqual([])
        
    });
})