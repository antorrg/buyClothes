import {discCreate, discGet, discUpdate, discDelete } from '../../Controllers/Product1/discController.js';

const getHandDisc = async(req, res)=>{
    try {
        const response = await discGet();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandDisc = async(req, res)=>{
    const {name}=req.body;
    try {
       const response = await discCreate(name);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandDisc = async(req, res)=>{
    const {id}=req.params;
    const data = req.body;
    try {
        const response = await discUpdate(id, data);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandDisc = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await discDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    getHandDisc,
    postHandDisc,
    putHandDisc,
    delHandDisc
};