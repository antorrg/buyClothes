import eh from '../utils/errors/errorHandlers.js'
import * as parser from '../Helpers/universalHelpers.js'
import { deleteImages } from '../services/mediaService.js';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800 }); // TTL (Time To Live) de media hora

class GenericService {
    constructor(Model, useCache= false, useImage= false) {
        this.Model = Model;
        this.useCache = useCache;
        this.useImage = useImage;
    }
    clearCache() {
        cache.del(`${this.Model.name.toLowerCase()}`);
    }

    async handleImageDeletion(imageUrl) {
        if (this.useImage && imageUrl) {
            await deleteImages(imageUrl);
        }
    }

    async create(data, uniqueField=null, parserFunction=null, isAdmin = false) {
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
            
            return parserFunction ? parserFunction(data, isAdmin) : data;
            
        } catch (error) {
            throw error;
        }
    }
    async getAll(parserFunction = false, isAdmin = false) {
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
            
            const dataParsed =  parserFunction ? data.map(dat => parserFunction(dat,isAdmin)) : data;
            if (this.useCache) {
                cache.set(cacheKey, dataParsed)}
                
            return {data: dataParsed,
                   cache: false
                   }
        } catch (error) {
            throw error;
        }
    }
    async getById(id, parserFunction = null, isAdmin = false) {
        try {
            const data = await this.Model.findByPk(id);
            
            if (!data) {
                eh.throwError(`The ${this.Model.name.toLowerCase()} table is empty!!`, 400);
            }
            
            return parserFunction ? parserFunction(data, isAdmin) : data;
        } catch (error) {
            throw error;
        }
    }

    async update(id, newData, parserFunction=null, isAdmin = false) {
        let imageUrl =''
        try {
            const dataFound = await this.Model.findByPk(id);
            
            if (!dataFound) {
                eh.throwError(`${this.Model.name} not found`, 404);
            }
            
            // Si newData.enable existe, parsea el booleano
            if (newData.enable !== undefined) {
                newData.enable = parser.parserBoolean(newData.enable);
            }
            if(this.useImage && dataFound.picture && dataFound.picture !== newData.picture){
             imageUrl= dataFound.picture;
            }
            
            const upData = await dataFound.update(newData);

            await this.handleImageDeletion(imageUrl);
            
            if (this.useCache) clearCache();
            return parserFunction ? parserFunction(upData, isAdmin) : upData;
        } catch (error) {
            throw error;
        }
    }

    async patcher(id, newData, parserFunction=null, isAdmin = false) {
        let imageUrl =''
        try {
            const dataFound = await this.Model.findByPk(id);
            
            if (!dataFound) {
                eh.throwError(`${this.Model.name} not found`, 404);
            }
            
            // Si newData.enable existe, parsea el booleano
            if (newData.enable !== undefined) {
                newData.enable = parser.parserBoolean(newData.enable);
            }
            if(this.useImage && dataFound.picture && dataFound.picture !== newData.picture){
                imageUrl= dataFound.picture;
               }
            const upData = await dataFound.update(newData);

            await this.handleImageDeletion(imageUrl);
            
            if (this.useCache) clearCache();

            return parserFunction ? parserFunction(upData, isAdmin) : upData;
            //return `${this.Model.name} updated succesfully`;
        } catch (error) {
            throw error;
        }
    }

    async delete(id, isHard) {
        let imageUrl =''
        try {
            const dataFound = await this.Model.findByPk(id);
            if (!dataFound) {
                eh.throwError(`${this.Model} not found`, 404);
            }
            this.useImage? imageUrl = dataFound.picture : '';
            if(isHard){
                await dataFound.destroy();
                await this.handleImageDeletion(imageUrl);

                if (this.useCache) clearCache();
                return `${this.Model.name} deleted successfully`;
            }
             await dataFound.update({ deletedAt: true });
             await this.handleImageDeletion(imageUrl);

             if (this.useCache) clearCache();

             return `${this.Model.name} deleted successfully`;
        } catch (error) {
            throw error;
        }
    }
}

export default GenericService;