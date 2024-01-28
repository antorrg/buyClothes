import {loginUser, createUser}from '../../Controllers/Users/loginUsers';

const userLogin = async(req,res)=>{
    const {email, password}= req.body
    try {
        const response = await loginUser(email, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

const userCreate = async(req,res)=>{
    const {email, password}= req.body;
    try {
        const response = await createUser(email, password);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

export {
    userLogin,
    userCreate
};
