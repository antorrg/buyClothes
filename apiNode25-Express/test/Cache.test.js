import SequelizeCache from '../src/Utils/sequelizeCache.js'
import { Cache } from '../src/Configs/database.js'

describe('Cache test from "SequelizeCache" static class. Methods: "setCache", "getCache", "clearCache".', () => {
  it('It should cache the data and key and then return them when a request is made.', async () => {
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
  it('should clear the selected cache', async () => {
    const key = 'abc12345'
    await SequelizeCache.clearCache(key)
    const getCache = await SequelizeCache.getCache(key)
    expect(getCache).toBe(null)
  })
  it('should return null if the expiration time is reached.', async () => {
    const key = 'abc12345'
    const value = { size: '38' }
    await SequelizeCache.setCache(key, value, -5)
    const getCache = await SequelizeCache.getCache(key)
    expect(getCache).toBe(null)
  })
  it('should clear the accumulated expired cache.', async () => {
    const data = await Cache.findAll()
    expect(data).toEqual([])
  })
})
