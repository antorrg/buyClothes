import { BaseService } from '../../Shared/Services/BaseService.js'
import eh from '../../Configs/errorHandlers.js'

export class UserService extends BaseService {
  constructor (Repository, fieldName, uniqueField = '', parserFunction = null, useImage = false, deleteImages = null, setRole = null, CustomerGet = null) {
    super(Repository, fieldName, uniqueField, parserFunction, useImage, deleteImages)
    this.setRole = setRole
    this.CustomerGet = CustomerGet
  }

  async login (data) {
    try {
      let user = await this.Repository.findById(data.id)
      if (!user) {
        user = await this.Repository.create(data)
      }
      return {
        message: 'Login exitoso',
        results: this.parserFunction ? this.parserFunction(user) : user
      }
    } catch (error) {
      eh.processError(error, 'User login error')
    }
  }

  async getById (id) {
    try {
      const user = await this.Repository.getById(id)
      if (!this.CustomerGet) { eh.throwError('Missing customer service', 500) }
      const userParsed = this.parserFunction ? this.parserFunction(user) : user
      const customer = await this.CustomerGet(id)
      return {
        message: 'User found',
        results: { user: userParsed, customer }
      }
    } catch (error) {
      eh.processError(error, 'User get error')
    }
  }

  async upgrade (id, data) {
    const { enabled, role, numberRole } = data

    try {
      const user = await this.Repository.getById(id)
      if (!user) {
        eh.throwError('User not found', 404)
      }

      const newData = { enabled }

      if (user.role !== numberRole) {
        const changeRole = await this.setRole(id, role)
        if (!changeRole.success) {
          eh.throwError('Upgrade error', 500)
        }
        newData.role = numberRole
      }

      const userUpgraded = await this.Repository.update(id, newData)
      return {
        message: 'User upgraded successfully',
        results: this.parserFunction ? this.parserFunction(userUpgraded) : userUpgraded
      }
    } catch (error) {
      eh.processError(error, 'User upgrade error')
    }
  }
}
