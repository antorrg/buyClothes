import express from 'express'
import {User, Category} from '../../src/database.js'
import GenericController from '../../src/Classes/genericController.js'
import UserService from '../../src/Classes/userService.js'
import GenericService from '../../src/Classes/genericServices.js'
import  parserUser  from '../../src/Helpers/parserUser.js'
import mid from '../../src/middlewares/middlewares.js'

import * as store from './testStore.js'
const user = new UserService(User)
const userController = new GenericController(user, parserUser)
const cat = new GenericService(Category)
const productController = new GenericController(cat)
//Server: 
const constrollerServer = express()
constrollerServer.use(express.json())

constrollerServer.post('/test/user/create',mid.createUser, userController.create)

constrollerServer.post('/test/user/login', userController.login)

// constrollerServer.get('/test/users/:id', )

// constrollerServer.put('/test/user/:id', )

// constrollerServer.put('/test/user/:id', )

// constrollerServer.post('/test/user', )

// constrollerServer.post('/test/page', )

// constrollerServer.post('/test/item', )

// constrollerServer.put('/test/item/:id', )

// constrollerServer.get('/test/:id', )

// constrollerServer.put('/test/page/:id', )

// constrollerServer.post('/test/reset', )

// constrollerServer.patch('/test/upgrade/:id', )

// constrollerServer.get('/test/page/:id', )

// constrollerServer.post('/test/land', )

// constrollerServer.put('/test/land/:id', )

constrollerServer.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Error interno del servidor";
    console.error(err);
    res.status(status).json({
        success: false,
        data: null,
        message,
    });
})

export default constrollerServer;
