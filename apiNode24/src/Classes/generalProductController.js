import eh from '../utils/errors/errorHandlers.js'

class GeneralProductController {
    constructor(service, parserFunction, isHard) {
        this.service = service;
        this.parserFunction = parserFunction || null;
        this.isHard = isHard || false;
    }
    static responder(res, status, success, message = null, results = null, ) {
        res.status(status).json({ success,  message , results});
    }
    create = eh.catchController(async (req, res) => {
        const {uniqueField, ...data}  = req.body;
        const response = await this.service.create(data, uniqueField, this.parserFunction);
        return GenericController.responder(res, 201, true,  "Created succesfully",response,)
    });
    createVariant= eh.catchController(async (req, res)=> {
        if (!this.service || typeof this.service.createVariant !== 'function') {
            return GenericController.responder(res, 501, false,  "Login is not implemented in this service", null,);
        }
        const {uniqueField, ...data}  = req.body;
        const response = await this.service.createVariant(data, uniqueField)
        return GenericController.responder(res, 201, true,  "Created succesfully", response,)
    })
    login = eh.catchController(async (req, res) => {
        if (!this.service || typeof this.service.login !== 'function') {
            return GenericController.responder(res, 501, false, "Login is not implemented in this service",null,);
        }
        const data  = req.body;
        const response = await this.service.login(data, this.parserFunction);
        return GenericController.responder(res, 200, true, "Login succesfully", response,);
    });

    getAll = eh.catchController(async (req, res) => {
        const queryObject = req.query || null;
        const {isAdmin}= req.query
        console.log('req.query: ', queryObject)
        const response = await this.service.getAll(uniqueField, this.parserFunction, isAdmin);
        if(response.cache===true){return GenericController.responder(res, 203, true,  null , response.data, )}
        return GenericController.responder(res, 200, true,  null , response.data, )
    });

    getById = eh.catchController(async (req, res) => {
        const { id } = req.params;
        const queryObject = req.query || null;
        const response = await this.service.getById(id,this.parserFunction, queryObject);
        return GenericController.responder(res, 200, true, null, response, )
    });

    update = eh.catchController(async (req, res) => {
        const { id } = req.params;
        const newData = req.body;
        const response = await this.service.update(id, newData);
        return GenericController.responder(res, 200, true, "Updated succesfully", response )
    });
    patcher = eh.catchController(async (req, res) => {
        const { id } = req.params;
        const newData = req.body;
        const response = await this.service.patcher(id, newData);
        return GenericController.responder(res, 200, true, "Updated succesfully", response )
    });

    delete = eh.catchController(async (req, res) => {
        const { id } = req.params;
        const response = await this.service.delete(id, this.isHard);
        return GenericController.responder(res, 200, true, response,  null )
    });
}

export default GeneralProductController;
