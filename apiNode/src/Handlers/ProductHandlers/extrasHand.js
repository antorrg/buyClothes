import {extraCreate, extraGet, extraUpdate, extraDelete } from '../../Controllers/Product1/extraController.js';

const getHandExtras = async(req, res)=>{
    try {
        const response = await extraGet();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandExtras = async(req, res)=>{
    const {name}=req.body;
    try {
       const response = await extraCreate(name);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandExtras = async(req, res)=>{
    const {id}=req.params;
    const data = req.body;
    try {
        const response = await extraUpdate(id, data);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandExtras = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await extraDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    getHandExtras,
    postHandExtras,
    putHandExtras,
    delHandExtras
};