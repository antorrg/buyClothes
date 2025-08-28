import { Router } from 'express'
import userRouter from './Features/user/user.routes.js'
import mediaRouter from './Features/media/media.route.js'

const mainRouter = Router()

mainRouter.use('/media', mediaRouter)

mainRouter.use('/api/v1/user', userRouter)

export default mainRouter
