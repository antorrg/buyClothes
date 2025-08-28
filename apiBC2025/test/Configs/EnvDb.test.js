import env from '../../src/Configs/envConfig.js'
import * as db from '../../src/Configs/database.js'

describe('Iniciando tests, probando variables de entorno del archivo "envConfig.js" y existencia de tablas en DB.', () => {
  beforeAll(async () => {
    await db.startApp(true, true)
  })
  afterAll(async () => {
    await db.closeDatabase()
  })

  it('Deberia retornar el estado y la variable de base de datos correcta', () => {
    const formatEnvInfo = `Servidor corriendo en: ${env.Status}\n` +
                   `Base de datos de testing: ${env.DatabaseUrl}`
    expect(formatEnvInfo).toBe('Servidor corriendo en: test\n' +
        'Base de datos de testing: postgres://postgres:antonio@localhost:5432/testbuyclothes')
  })
  it('Debería verificar la existencia de tablas en la base de datos', async () => {
    const result = await db.sequelize.query(`
              SELECT tablename 
              FROM pg_catalog.pg_tables 
              WHERE schemaname = 'public';
          `, { type: db.sequelize.QueryTypes.SELECT })

    const tableNames = result.map(row => row.tablename)

    const expectedTables = [
      'Products',
      'ProductVariants',
      'FinalProducts',
      'Categories',
      'Disciplines',
      'Genres',
      'Trademarks',
      'Companies',
      'Ratings',
      'Sales',
      'Users',
      'Customers',
      'Landings',
      'Caches'
    ]

    expectedTables.forEach(table => {
      expect(tableNames).toContain(table)
    })
  })
  it('deberia hacer un get a las tablas y obtener un arreglo vacio', async () => {
    const models = [
      'Product',
      'ProductVariant',
      'FinalProduct',
      'Category',
      'Discipline',
      'Genre',
      'Trademark',
      'Company',
      'Rating',
      'Sales',
      'User',
      'Customer',
      'Landing',
      'Cache'
    ]
    for (const model of models) {
      const records = await db[model].findAll()
      expect(Array.isArray(records)).toBe(true)
      expect(records.length).toBe(0)
    }
  })
})
