import { BaseController } from "../../Shared/Controllers/BaseController.js";
import eh from '../../Configs/errorHandlers.js'

export class ProductController extends BaseController{
    constructor(service){
        super(service)
    }
    getJsonId = eh.catchController(async(req, res)=>{
        const {id} = req.params
        const response = this.service.getJson(id)
        return BaseController.responder(res, 200, 'Product found', response)
    })
    getadminWithPagination = eh.catchController(async (req,res)=>{
        const queryObject = req.query
        const response = this.service.getWithPagination(queryObject, true)
        return BaseController.responder(res, 200, response.message, response.results)
    })
}