import { getProduct1, updateProduct1 } from "../../Controllers/Product1/prodControllers/index.js";


const getProd1= async(req, res)=>{
    const {id}=req.params;
    try {
        const response = getProduct1(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

const updProd1 = async (req, res)=>{
    const {id}= req.params;
    const {newData}=req.body;
    try {
        const response = await updateProduct1(id, newData)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export {
    getProd1,
    updProd1
}