import {generalProdCreate, generalProdGetById, generalProdGet, generalProdUpdate, generalProdDelete} from '../../Controllers/GeneralProduct/index.js'

const generalCreateHandler = async (req, res)=>{
    const {name, description, released, category, discipline, genre, trademarck, variants}=req.body;
    try {
        const response = await generalProdCreate(name, description, released, category, discipline, genre, trademarck, variants);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const generalGetHandler = async (req, res)=>{
    const page = req.query.page || 1;
    try {
        const response = await generalProdGet(req, page);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const generalGetByIdHandler = async (req, res)=>{
        const {id}=req.params;
        const size = req.query.size;
        const colorQ = req.query.color;
        const color = colorQ? colorQ.charAt(0).toUpperCase() + colorQ.slice(1):'';
    try {
        const response = await generalProdGetById(id, size, color);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const generalUpdateHandler = async (req, res)=>{
    const {id}=req.params;
    const {newData}= req.body;
    try {
        const response = await generalProdUpdate(id, newData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const generalDeleteHandler = async (req, res)=>{
    const {id}=req.params;
    try {
        const response = await generalProdDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export {
    generalCreateHandler,
    generalGetHandler,
    generalGetByIdHandler,
    generalUpdateHandler,
    generalDeleteHandler,
};