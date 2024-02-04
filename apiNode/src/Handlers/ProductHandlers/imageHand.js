

const getHandImages = async(req, res)=>{
    try {
        const response = await xxxxxx();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const postHandImages = async(req, res)=>{
    const {xx}=req.body;
    try {
       const response = await xx(xx);
       res.status(201).json(response);
    } catch (error) {
       res.status(400).json({error:error.message})
    }
};

const putHandImages = async(req, res)=>{
    const {id}=req.params;
    const data = req.body;
    try {
        const response = await xxxxxx(id, data);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delHandImages = async(req, res)=>{
    const {id}=req.params;
    try {
        const response = await xxxx(id);
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