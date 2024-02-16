import {genCreate, genGet, genUpdate, genDelete } from '../../Controllers/Product1/genController.js';

const getHandGen = async(req, res)=>{
    try {
        const response = await genGet();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandGen = async(req, res)=>{
    const {name}=req.body;
    try {
       const response = await genCreate(name);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandGen = async(req, res)=>{
    const {id}=req.params;
    const data = req.body;
    try {
        const response = await genUpdate(id, data);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandGen = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await genDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    getHandGen,
    postHandGen,
    putHandGen,
    delHandGen
};