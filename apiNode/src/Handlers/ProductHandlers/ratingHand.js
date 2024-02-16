import { ratCreate, ratGet, ratUpdate, ratDelete } from '../../Controllers/Product1/ratingController'

const getHandRating = async(req, res)=>{
    try {
        const response = await ratGet();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandRating  = async(req, res)=>{
    const {comment, score}=req.body;
    try {
       const response = await ratCreate(comment, score);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandRating  = async(req, res)=>{
    const {id}=req.params;
    const data = req.body;
    try {
        const response = await ratUpdate(id, data);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandRating  = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await ratDelete(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    getHandRating,
    postHandRating,
    putHandRating,
    delHandRating
};