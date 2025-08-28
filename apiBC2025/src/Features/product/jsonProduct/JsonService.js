import {BaseService} from '../../../Shared/Services/BaseService.js'
import eh from '../../../Configs/errorHandlers.js'

export class JsonService extends BaseService{
      constructor (Repository, fieldName, uniqueField = '', parserFunction = null){
        super(Repository, fieldName, uniqueField, parserFunction)
      }
      async getWithPagination(queryObject){
        const response = await this.Repository.getWithPagination(queryObject)
        const dataParsed = this.parserFunction? response.data.map(dt => this.parserFunction(dt)) : response.data
        return {
          info: response.info,
          data: dataParsed
        }
      }
      async getById(id){
        try {
            const response = await this.Repository.getOne(id, this.uniqueField)
            if(!response){return null}
            return this.parserFunction? this.parserFunction(response) : response
        } catch (error) {
            eh.processError(error,'JsonService')
        }
      }
}