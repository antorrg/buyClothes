import GeneralService from './GeneralService.js'
import bcrypt from 'bcrypt'
import env from '../Configs/envConfig.js'
import eh from '../Configs/errorHandlers.js'
import jwt from '../Auth/jwt.js'

class UserService extends GeneralService {
  constructor (Repository, fieldName, useCache = false, parserFunction = null, useImage = false, deleteImages = null) {
    super(Repository, fieldName, useCache, parserFunction, useImage, deleteImages)
  }

  async create (data, uniqueField = null) {
    const setNickname = data.email.split('@')[0]
    const hashedPassword = await bcrypt.hash(data.password, 12)
    const setRole = data.role || 1
    const setPicture = data.picture || env.UserImg
    const dataSetled = {
      email: data.email,
      setNickname,
      password: hashedPassword,
      role: setRole,
      picture: setPicture
    }
    const newRecord = await this.Repository.create(dataSetled, uniqueField)

    return this.parserFunction ? this.parserFunction(newRecord) : newRecord
  }

  async login (data) { // data, uniqueField, isAdmin
    const userFound = await this.Repository.getOne(data.email, 'email', true)
    if (userFound.enable === false) { eh.throwError('Usuario bloqueado', 400) }
    const paswordMatch = bcrypt.compare(userFound.password, data.password)
    if (!paswordMatch) { eh.throwError('Contraseña incorrecta', 400) }
    return {
      message: 'Autenticacion exitosa. Bienvenido',
      results: {
        user: this.parserFunction ? this.parserFunction(newRecord) : newRecord,
        token: jwt.generateToken(userFound)
      }
    }
  }
}
export default UserService
