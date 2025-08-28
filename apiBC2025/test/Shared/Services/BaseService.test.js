import BaseRepository from '../../../src/Shared/Repositories/BaseRepository.js'
import { User, startApp, closeDatabase } from '../../../src/Configs/database.js'
import { BaseService } from '../../../src/Shared/Services/BaseService.js'
import * as fns from '../../generalFunctions.js'
import * as store from '../../testHelpers/testStore.help.js'

const dataEmptyExample = {
  id: 'none',
  email: 'no data yet',
  username: 'no data yet',
  password: 'no data yet',
  role: 'no data yet',
  picture: 'no data yet',
  enabled: true,
  createdAt: 'no data yet'
}
class TestClass extends BaseRepository {
  constructor (Model, dataEmpty) {
    super(Model, dataEmpty)
  }
}

describe('Unit tests for the GeneralService class: CRUD.', () => {
  beforeAll(async () => {
    await startApp(true, true)
  })

  const testing = new TestClass(User, dataEmptyExample)

  // repository, fieldName(string), uniqueField(string), parserFunction(function), useImage(boolean), deleteImages(function)
  const serv = new BaseService(testing, 'User', 'email', null, true, fns.deletFunctionFalse)
  const servParse = new BaseService(testing, 'User', 'email', cleanData, true, fns.deletFunctionTrue)
  describe('The "create" method to create a service', () => {
    it('should create an element with the correct parameters', async () => {
      const element = {
        email: 'usuario@gmail.com',
        password: 'L1234567',
        picture: 'https://picture.com'
      }
      const response = await servParse.create(element)
      store.setStringId(response.results.id)
      expect(response.results).toMatchObject({
        id: expect.any(String),
        email: 'usuario@gmail.com',
        role: 'User',
        picture: 'https://picture.com',
        username: null,
        enabled: true,
        createdAt: expect.any(Date)
      })
    })
    it('should throw an error when trying to create the same element twice (error handling)', async () => {
      const element = {
        email: 'usuario@gmail.com',
        password: 'L1234567',
        picture: 'https://picture.com'
      }
      try {
        await servParse.create(element)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('This user email already exists')
        expect(error.status).toBe(400)
      }
    })
  })
  describe('"GET" methods. Return services or a single service.', () => {
    it('"getAll" method: should return an array with the services', async () => {
      const response = await servParse.getAll()
      // console.log('response get: ', [response])
      expect(response.message).toBe('Users found successfully')
      expect(response.results).toEqual([{
        id: expect.any(String),
        email: 'usuario@gmail.com',
        role: 'User',
        picture: 'https://picture.com',
        username: null,
        enabled: true,
        createdAt: expect.any(Date)
      }])
    })
  })
  describe('"update" method. Removal of old images from storage.', () => {
    it('should update the elements and not delete images', async () => {
      const id = store.getStringId()
      const newData = { username: 'perico de los palotes' }
      const response = await servParse.update(id, newData)
      expect(response.message).toBe('User updated successfully')
      expect(response.results).toMatchObject({
        id: expect.any(String),
        email: 'usuario@gmail.com',
        role: 'User',
        picture: 'https://picture.com',
        username: 'perico de los palotes',
        enabled: true,
        createdAt: expect.any(Date)
      })
    })
    it('should update the elements and handle image deletion', async () => {
      const id = store.getStringId()
      const newData = { picture: 'https://imagen.com.ar' }
      const response = await servParse.update(id, newData)
      expect(response.message).toBe('User updated successfully')
      expect(response.results).toMatchObject({
        id: expect.any(String),
        email: 'usuario@gmail.com',
        role: 'User',
        picture: 'https://imagen.com.ar',
        username: 'perico de los palotes',
        enabled: true,
        createdAt: expect.any(Date)
      })
    })
    it('should throw an error if image deletion fails', async () => {
      const id = store.getStringId()
      const newData = { picture: 'https://imagen22.com.ar' }
      try {
        await serv.update(id, newData)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(500)
        expect(error.message).toBe('Error processing ImageUrl: https://imagen.com.ar')
      }
    })
  })
  describe('"delete" method.', () => {
    it('should delete an element', async () => {
      const element = { email: 'segundo@gmail.com', password: 'L1234567', picture: 'https://picture.com' }
      const secondElement = await serv.create(element)
      store.setNumberId(secondElement.results.id)
      const id = store.getStringId()
      const response = await servParse.delete(id)
      expect(response.message).toBe('User deleted successfully')
      expect(response.results).toBe('User deleted: usuario@gmail.com')
    })
    it('should throw an error if image deletion fails', async () => {
      const id = store.getNumberId()
      try {
        await serv.delete(id)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(500)
        expect(error.message).toBe('Error processing ImageUrl: https://picture.com')
      }
    })
  })
})
afterAll(async () => {
  await closeDatabase()
})
function cleanData (d) {
  return {
    id: d.id,
    email: d.email,
    role: scope(d.role),
    picture: d.picture,
    username: d.username,
    enabled: d.enabled,
    createdAt: d.createdAt
  }
}
function scope (role) {
  switch (role) {
    case 1:
      return 'User'
    case 2:
      return 'Moderator'
    case 3:
      return 'Admin'
    case 9:
      return 'SuperAdmin'
    default:
      return 'User'
  }
}
