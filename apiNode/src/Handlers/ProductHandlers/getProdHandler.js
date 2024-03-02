import { getProduct1, updateProduct1 } from "../../Controllers/Product1/prodControllers/index.js";

const getProductsHandler = async (req,res)=>{
    try {
        const response = await getProduct1()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}
const updateProductsHand = async (req,res)=>{
    const {id}=req.params;
    const {newData}=req.body;
    try {
        const response = await updateProduct1(id, newData)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}
export {
    getProductsHandler,
    updateProductsHand
};