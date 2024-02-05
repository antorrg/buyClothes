import {catsCreate,catsGet,catsUpdate,catsDelete} from '../../Controllers/Product1/catController.js'

const getHandCategory = async(req, res)=>{
    try {
        const response = await catsGet();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandCategory = async(req, res)=>{
    const {name}=req.body;
    try {
       const response = await catsCreate(name);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandCategory = async(req, res)=>{
    const {id}=req.params;
    const newData = req.body;
    try {
        const response = await catsUpdate(id, newData);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandCategory = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await catsDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    getHandCategory,
    postHandCategory,
    putHandCategory,
    delHandCategory
};