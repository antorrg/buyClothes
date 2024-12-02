import eh from '../utils/errors/errorHandlers.js'
import * as parser from '../Helpers/universalHelpers.js'
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800 }); // TTL (Time To Live) de media hora

class GenericService {
    constructor(Model, useCache= false) {
        this.Model = Model;
        this.useCache = useCache;
    }

    async create(data, uniqueField=null, parserFunction=null) {
        try {
            const whereClause = {deletedAt: false,};
            if (uniqueField) {
                whereClause[uniqueField] = data[uniqueField];
            }
            const existingRecord = await this.Model.findOne({ where: whereClause });
            
            if (existingRecord) {
                eh.throwError(`This ${this.Model.name.toLowerCase()} ${uniqueField || 'entry'} already exists`, 400);
            }
            
            const newRecord = await this.Model.create(data);
            
            return parserFunction ? parserFunction(newRecord) : newRecord;
            
        } catch (error) {
            eh.throwError(`Error creating ${this.Model.name.toLowerCase()}`, 500);
        }
    }
    async getAll(parserFunction = null) {
        let cacheKey = `${this.Model.name.toLowerCase()}`;
        if (this.useCache) { let cachedData = cache.get(cacheKey);
            if (cachedData) {
                return {
                    data: cachedData,
                    cache: true,
                };
            }
        }
        try {
            const data = await this.Model.findAll({
                where: {
                    deletedAt: false
                }
            });
            
            if (data.length === 0) {
                eh.throwError(`The ${this.Model.name.toLowerCase()} table is empty!!`, 400);
            }
            
            const dataParsed = parserFunction ? data.map(parserFunction) : data;
            if (this.useCache) {
                cache.set(cacheKey, parsedData)}
                
            return {data: dataParsed,
                   cache: false
                   }
        } catch (error) {
            eh.throwError(`Error retrieving ${this.Model.name.toLowerCase()}`, 500);
        }
    }
    async getById(id, parserFunction = null) {
        try {
            const data = await this.Model.findByPk(id);
            
            if (!data) {
                eh.throwError(`The ${this.Model.name.toLowerCase()} table is empty!!`, 400);
            }
            
            return parserFunction ? parserFunction(data) : data;
        } catch (error) {
            eh.throwError(`Error retrieving ${this.Model.name.toLowerCase()}`, 500);
        }
    }

    async update(id, newData, parserFunction=null) {
        try {
            const dataFound = await this.Model.findByPk(id);
            
            if (!dataFound) {
                eh.throwError(`${this.Model.name} not found`, 404);
            }
            
            // Si newData.enable existe, parsea el booleano
            if (newData.enable !== undefined) {
                newData.enable = parser.parserBoolean(newData.enable);
            }
            const upData = await dataFound.update(newData);
            if (this.useCache) {
                cache.del(`${this.Model.name.toLowerCase()}`);
            }
            return parserFunction ? parserFunction(upData) : upData;
        } catch (error) {
            eh.throwError(`Error updating ${this.Model.name.toLowerCase()}`, 500);
        }
    }

    async patcher(id, newData, parserFunction=null) {
        try {
            const dataFound = await this.Model.findByPk(id);
            
            if (!dataFound) {
                eh.throwError(`${this.Model.name} not found`, 404);
            }
            
            // Si newData.enable existe, parsea el booleano
            if (newData.enable !== undefined) {
                newData.enable = parser.parserBoolean(newData.enable);
            }
            
            const upData = await dataFound.update(newData);
            
            if (this.useCache) {
                cache.del(`${this.Model.name.toLowerCase()}`);
            }
            return parserFunction ? parserFunction(upData) : upData;
            //return `${this.Model.name} updated succesfully`;
        } catch (error) {
            eh.throwError(`Error updating ${this.Model.name.toLowerCase()}`, 500);
        }
    }

    async delete(id, isHard) {
        try {
            const dataFound = await this.Model.findByPk(id);
            if (!dataFound) {
                eh.throwError(`${this.Model} not found`, 404);
            }
            if(isHard){
                await dataFound.destroy();
                return `${this.Model.name} deleted successfully`;
            }
             await dataFound.update({ deletedAt: true });

             if (this.useCache) {
                cache.del(`${this.Model.name.toLowerCase()}`);
            }
             return `${this.Model.name} deleted successfully`;
        } catch (error) {
            eh.throwError(`Error deleting ${this.Model.name.toLowerCase()}`, 500);
        }
    }
}

export default GenericService;