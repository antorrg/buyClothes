import {tradeCreate, tradeGet, tradeUpdate, tradeDelete } from '../../Controllers/Product1/tradeController.js';

const getHandTrade = async(req, res)=>{
    try {
        const response = await tradeGet();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandTrade = async(req, res)=>{
    const {name}=req.body;
    try {
       const response = await tradeCreate(name);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandTrade = async(req, res)=>{
    const {id}=req.params;
    const data = req.body;
    try {
        const response = await tradeUpdate(id, data);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandTrade = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await tradeDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    getHandTrade,
    postHandTrade,
    putHandTrade,
    delHandTrade
};