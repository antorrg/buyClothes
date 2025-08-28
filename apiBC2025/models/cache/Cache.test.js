import SequelizeCache from '../../src/Configs/sequelizeCache.js'
import { Cache } from '../../src/Configs/database.js'

describe('SequelizeCache: static methods "setCache", "getCache", and "clearCache"', () => {
  it('should store the key and data in the cache and return them on retrieval', async () => {
    const key = 'abc12345'
    const value = {
      size: '38',
      color: 'Blanco',
      price: '19.99',
      stock: 100,
      enable: true,
      deletedAt: null
    }
    await SequelizeCache.setCache(key, value, 5)
    const getCache = await SequelizeCache.getCache(key)
    expect(getCache).toEqual(value)
  })
  it('should remove the specified cache entry', async () => {
    const key = 'abc12345'
    await SequelizeCache.clearCache(key)
    const getCache = await SequelizeCache.getCache(key)
    expect(getCache).toBe(null)
  })
  it('should return null if the cache has expired', async () => {
    const key = 'abc12345'
    const value = { size: '38' }
    await SequelizeCache.setCache(key, value, -5)
    const getCache = await SequelizeCache.getCache(key)
    expect(getCache).toBe(null)
  })
  it('should clean up expired cache entries', async () => {
    const data = await Cache.findAll()
    expect(data).toEqual([])
  })
})
