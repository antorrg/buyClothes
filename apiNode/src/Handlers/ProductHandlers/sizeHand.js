import {sizeCreate, sizeGet, sizeUpdate, sizeDelete} from '../../Controllers/Product1/sizeController.js';

const getHandSize = async(req, res)=>{
    try {
        const response = await sizeGet();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandSize = async(req, res)=>{
    const {name}=req.body;
    try {
       const response = await sizeCreate(name);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandSize = async(req, res)=>{
    const {id}=req.params;
    const newData = req.body;
    try {
        const response = await sizeUpdate(id, newData);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandSize = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await sizeDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    getHandSize,
    postHandSize,
    putHandSize,
    delHandSize
};