import express from "express";
import ProductRepository from "./Repositories/ProductRepository.js";
import {parsedProductGet, parsedProductGetById} from "../test/Repositories/helpers/dataProducts.js"

const tuki = new ProductRepository()
const mainRouter = express.Router();

mainRouter.post('/create', async(req, res)=>{
    const data = req.body
    try {
        const response = await tuki.create(data)
        res.status(201).json(response)
    } catch (error) {
        res.status(error.status ||500).json({error: error.message})
    }
})
mainRouter.get('/', async(req, res)=>{ //page, size, name, trademark, fields
   
    const size=req.query.size||3
    const name = req.query.name || ""
    const trademark = req.query.trademark ||""
    const fields = req.query.fields || ""
    
    try {
        const response = await tuki.getProduct(page, size, name, trademark, fields)
        const pepe = parsedProductGet(response.results)
        res.status(200).json({info: response.info, results: pepe})
    } catch (error) {
        res.status(error.status ||500).json({error: error.message})
    }
})
mainRouter.get('/:id', async(req, res)=>{ //page, size, name, trademark, fields
    const {id} = req.params
    const size =req.query.size||""
    const color = req.query.color || ""
   
    try {
        const response = await tuki.getById(id, size, color)
        const pepe = parsedProductGetById(response)
        res.status(200).json({info: 'response.info', results: pepe})
    } catch (error) {
        res.status(error.status ||500).json({error: error.message})
    }
})

export default mainRouter;