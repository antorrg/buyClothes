import express from 'express'
import * as img from './media.controller.js'

const mediaRouter = express.Router()

mediaRouter.post(
    '/upload', 
    img.uploadMiddleware, 
    img.imageController
)
mediaRouter.post(
    '/delete',
    img.imageDelete
)

export default mediaRouter