import { userService } from '../../../src/Features/user/user.routes.js'
import { customerService } from '../../../src/Features/user/customer/customer.routes.js'
import { startApp, closeDatabase } from '../../../src/Configs/database.js'

// Este test no utiliza una instancia nueva de userService sino la misma que esta en el archivo routes
// alli se teste no solo las funcionalidades de UserService sino tambien las de CustomerService

describe('UserService & CustomerService classes. Unit test.', () => {
  beforeAll(async () => {
    await startApp(true, true)
  })
  afterAll(async () => {
    await closeDatabase()
  })
  describe('login method', () => {
  it('should create a user with the correct parameters', async () => {
    const userData = {
      id: 'f27df62cae5318a741a836df87a5',
      email: 'pericodelospalotes@gmail.com',
      nickname: 'pericodelospalotes',
      name: 'pedro',
      role: 1,
      picture: 'https://imagen.com'
    }
    const user = await userService.login(userData)
    expect(user.message).toBe('Login exitoso')
  })
  it('should retrieve an success message with user already created', async () => {
    const userData = {
      id: 'f27df62cae5318a741a836df87a5',
      email: 'pericodelospalotes@gmail.com',
      nickname: 'pericodelospalotes',
      name: 'pedro',
      role: 1,
      picture: 'https://imagen.com'
    }
    const user = await userService.login(userData)
    expect(user.message).toBe('Login exitoso')
  })
  })
  describe('getById user method', () => {
  it('should retrieve an user without customer', async () => {
    const user = await userService.getById('f27df62cae5318a741a836df87a5')
    // console.log(user.results)
    expect(user.message).toBe('User found')
    expect(user.results).toEqual({
      user: {
        id: 'f27df62cae5318a741a836df87a5',
        email: 'pericodelospalotes@gmail.com',
        role: 'User',
        picture: 'https://imagen.com',
        name: 'pedro',
        enabled: true
      },
      customer: {
        id: '',
        userId: 'no data yet',
        surname: 'no data yet',
        typeId: 'no data yet',
        numberId: 'no data yet',
        country: 'no data yet',
        postalCode: 'no data yet',
        address: 'no data yet',
        additionalInfo: 'Para realizar compras debe completar su informacion personal'
      }
    })
  })
  it('should retrieve an user with customer', async () => {
  // ? Creación del customer:
    const customerData = {
      userId: 'f27df62cae5318a741a836df87a5',
      surname: 'Del Madero',
      typeId: 'DNI',
      numberId: '44533281',
      country: 'Argentina',
      postalCode: 7412,
      address: 'de la esquina mas aca 440',
      additionalInfo: 'No hay informacion adicional'
    }
    await customerService.create(customerData)
    // ?---------------- comienza el get -----------------------------
    const user = await userService.getById('f27df62cae5318a741a836df87a5')
    expect(user.message).toBe('User found')
    expect(user.results).toEqual({
      user: {
        id: 'f27df62cae5318a741a836df87a5',
        email: 'pericodelospalotes@gmail.com',
        role: 'User',
        picture: 'https://imagen.com',
        name: 'pedro',
        enabled: true
      },
      customer: {
        id: expect.any(String),
        userId: 'f27df62cae5318a741a836df87a5',
        surname: 'Del Madero',
        typeId: 'DNI',
        numberId: '44533281',
        country: 'Argentina',
        postalCode: 7412,
        address: 'de la esquina mas aca 440',
        additionalInfo: 'No hay informacion adicional'
      }
    })
  })
})
describe('upgrade user method', () => {
  it('should update the role of user', async () => {
    const id = 'f27df62cae5318a741a836df87a5'
    const data = { enabled: true, role: 'Admin', numberRole: 3 }
    const test = await userService.upgrade(id, data)
    expect(test.message).toBe('User upgraded successfully')
  })
})
})
