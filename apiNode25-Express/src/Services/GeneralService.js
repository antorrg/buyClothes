import eh from "../Configs/errorHandlers.js";
import NodeCache from 'node-cache';



const throwError = eh.throwError
const cache = new NodeCache({ stdTTL: 1800 }); // TTL (Time To Live) de media hora

class GeneralService {
    constructor(Repository, fieldName, useCache= false, parserFunction=null, useImage= false, deleteImages = null) {
        this.Repository = Repository;
        this.fieldName = fieldName;
        this.useCache = useCache;
        this.useImage = useImage;
        this.deleteImages = deleteImages;
        this.parserFunction = parserFunction
    }
    clearCache() {
        cache.del(`${this.Repository.name.toLowerCase()}`);
    }
    
    async handleImageDeletion(imageUrl) {
        if (this.useImage && imageUrl) {
            await this.deleteImages(imageUrl);
        }
    }

  
    async create(data, uniqueField=null,) {
        try {
           
            const newRecord = await this.Repository.create(data, uniqueField);

            if (this.useCache) this.clearCache();
            return this.parserFunction ? this.parserFunction(newRecord) : newRecord;
            
        } catch (error) {
            throw error;
        }
    }
    async getAll(isAdmin = false) {
        //console.log('service',emptyObject)
        let cacheKey = `${this.fieldName.toLowerCase()}`;
        if (this.useCache) { let cachedData = cache.get(cacheKey);
            if (cachedData) {
                return {
                    data: cachedData,
                    cache: true,
                };
            }
        }
        try {
            let data = await this.Repository.getAll(isAdmin)
           
           const dataParsed = this.parserFunction ? data.map(dat => this.parserFunction(dat)) : data;
            //console.log('soy la data: ', dataParsed)
            if (this.useCache) {
                cache.set(cacheKey, dataParsed)}
                //console.log(dataParsed)
            return {data: dataParsed,
                   cache: false
                   }
        } catch (error) {
            throw error;
        }
    }
    async getById(id, isAdmin = false) {
        try {
            const data = await this.Repository.getById(id, isAdmin);
           
            return this.parserFunction ? this.parserFunction(data) : data;
        } catch (error) {
            throw error;
        }
    }
   
    async update(id, newData) {
       // console.log('soy el id en el service : ', id)
        //console.log('soy newData en el service : ', newData)
       
        let imageUrl =''
        let deleteImg = false;
        try {
            const dataFound = await this.Repository.getById(id, newData);
            
            if(this.useImage && dataFound.picture && dataFound.picture !== newData.picture){
             imageUrl= dataFound.picture;
             deleteImg = true
            }
            
            const upData = await this.Repository.update(id, newData);

            if(deleteImg){
              await this.handleImageDeletion(imageUrl);
            }
            
            if (this.useCache) this.clearCache();
            return {
                message: `${this.fieldName} updated successfully`,
                data: this.parserFunction ? this.parserFunction(upData) : upData
            }
        } catch (error) {
            throw error;
        }
    }
    
    async delete(id) {
        let imageUrl =''
        try {
            const dataFound = await this.Repository.getById(id);
            
            this.useImage? imageUrl = dataFound.picture : '';
            
                await this.Repository.delete(id);
                
                await this.handleImageDeletion(imageUrl);

                if (this.useCache) this.clearCache();
                return `${this.fieldName} deleted successfully`;
            
        } catch (error) {
            throw error;
        }
    }
}

export default GeneralService;