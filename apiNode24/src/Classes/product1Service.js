import GenericService from "./genericServices.js";
import eh from "../utils/errors/errorHandlers.js"
import {Extra} from '../database.js'


class Product1Service extends GenericService{
    constructor(Model){
        super(Model)
    }
    async getAll(generalProdId, parserFunction = null, isAdmin = false) {
      
        try {
            const data = await this.Model.findAll({
                where: {
                    GeneralProductId:generalProdId
                },
                include: [
                    {
                        model: Extra,
                        attributes: ['id','name'],
                        through: { attributes: [] },
                    },
                ],
            });
            
            if (data.length === 0) {
                eh.throwError(`No records found in the ${this.Model.name} table.`, 404);
            }
            
            return parserFunction ? data.map(dat => parserFunction(dat,isAdmin)) : data;
        } catch (error) {
            throw error;
        }
    }
    async getById(id, parserFunction = null, isAdmin = false) {
        try {
            const data = await this.Model.findByPk(id, {
                include: [
                    {
                        model: Extra,
                        attributes: ['name'],
                        through: { attributes: [] },
                    },
                ],
            });
            if (!data) {
                eh.throwError(`No records found in the ${this.Model.name} table.`, 404);
            }
            return parserFunction ? parserFunction(data, isAdmin) : data;
        } catch (error) {
            throw error;
        }
    }
    async update(id, newData){
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
            if(newData.Extras){
            upData.addExtra(newData.Extras)
            }
            return upData
            //return `${this.Model.name} updated succesfully`;
        } catch (error) {
            throw error;
        }
    }
}

export default Product1Service