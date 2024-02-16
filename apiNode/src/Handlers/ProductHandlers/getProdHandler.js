import { getProduct1 } from "../../Controllers/Product1/prodControllers/index";

const getProdHandler = async (req,res)=>{
    try {
        const response = await getProduct1()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

export default getProdHandler;