import {imgsGet, imgsCreate,imgsUpd, imgsDel} from '../../Controllers/Product1/imageController.js'

const getHandImages = async(req, res)=>{
    try {
        const response = await imgsGet();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandImages = async(req, res)=>{
    const {name,images}=req.body;
    try {
       const response = await imgsCreate(name, images);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandImages = async(req, res)=>{
    const {id}=req.params;
    const data = req.body;
    try {
        const response = await imgsUpd(id, data);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandImages = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await imgsDel(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    getHandImages,
    postHandImages,
    putHandImages,
    delHandImages
};