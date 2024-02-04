

const getHandRating = async(req, res)=>{
    try {
        const response = await xxxxxx();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandRating  = async(req, res)=>{
    const {xx}=req.body;
    try {
       const response = await xx(xx);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandRating  = async(req, res)=>{
    const {id}=req.params;
    const data = req.body;
    try {
        const response = await xxxxxx(id, data);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandRating  = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await xxxx(id);
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