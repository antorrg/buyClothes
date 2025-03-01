import eh from "../Configs/errorHandlers.js"

class GeneralController {
    constructor(service, isAdmin=false) {
        this.service = service;
        this.isAdmin = isAdmin;
    }
    responder(res, status, success, message = null, results = null, ) {
        res.status(status).json({ success,  message , results});
    }
    create = eh.catchController(async (req, res) => {
        const {uniqueField, ...data}  = req.body;
        const response = await this.service.create(data, uniqueField);
        return GeneralController.responder(res, 201, true,  "Created succesfully",response,)
    });
    
    getAll = eh.catchController(async (req, res) => {
        const queryObject = req.query || {};
        const response = await this.service.getAll(queryObject, this.isAdmin);
        if(response.cache===true){return this.responder(res, 203, true,  null , response.data, )}
        return GeneralController.responder(res, 200, true,  null , response.data, )
    });

    getById = eh.catchController(async (req, res) => {
        const { id } = req.params;
        const queryObject = req.query || {};
        const response = await this.service.getById(id, queryObject, this.isAdmin);
        return GeneralController.responder(res, 200, true, null, response, )
    });

    update = eh.catchController(async (req, res) => {
        const { id } = req.params;
        const newData = req.body;
        const response = await this.service.update(id, newData);
        return GeneralController.responder(res, 200, true, response.message, response.data )
    });
    
    delete = eh.catchController(async (req, res) => {
        const { id } = req.params;
        const response = await this.service.delete(id);
        return GeneralController.responder(res, 200, true, response,  null )
    });
}

export default GeneralController;
