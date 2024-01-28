import {getUsers, getById, updUserController } from '../../Controllers/Users/getUsers'

const getHandlerUsers = async(req, res)=>{
    try {
        const response = await getUsers();
        res.status(200).json(response);
    } catch (error) {
        //console.error('el error esta en el handler')
        res.status(400).json({error: error.message});
    }
};

const getHandlerId = async(req,res)=>{
    const {id}=req.params;
    try {
        const response = await getById(id);
        res.status(200).json(response)
    } catch (error) {
        console.error('el error esta en el handler (id)')
        res.status(400).json({error: error.message});
    }
}
const updateUser = async (req, res)=>{
    const {id} = req.params;
    console.log ('handlerParam '+id)
    const newData = req.body;
    console.log('handlerData '+newData)
    try {
        const response = await updUserController(id, newData);
        res.status(200).json(response)
        
    } catch (error) {
        console.error('el error esta en el handler update')
        res.status(400).json({error: error.message});
    }
}
export {
    getHandlerUsers,
    getHandlerId,
    updateUser 
};