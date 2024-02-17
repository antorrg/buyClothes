import {createProduct1, getProd1ById,updateProduct1,deleteProduct1} from '../../Controllers/Product1/index.js'



const createProdHand = async (req,res)=>{
 const {name, description, characteristics, released, price, stock, images, category, sizes,  discipline, genre, trademarck}=req.body;
 try {
    const response = await createProduct1(name, description, characteristics, released, price, stock, images, category, sizes,  discipline, genre, trademarck);
    res.status(201).json(response);
 } catch (error) {
    res.status(400).json({error:error.message})
 }
};

const getProdByIdHand = async (req, res)=>{
    const {id}=req.params;
    try {
        const response = await getProd1ById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const updProdHand = async (req,res)=>{
    const {id}=req.params;
    const data = req.body;
    try {
        const response = await updateProduct1(id, data);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const delProdHand = async (req, res)=>{
    const {id}=req.params;
    try {
        const response = await deleteProduct1(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    createProdHand,
    getProdByIdHand,
    updProdHand,
    delProdHand
};