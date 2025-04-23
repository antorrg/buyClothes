import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerOptions from './Configs/swaggerDocs/swaggerOptions.js'
import eh from './Configs/errorHandlers.js'
import env from './Configs/envConfig.js'
import mainRouter from './routes.js'

// Swagger:
const swaggerDocs = swaggerJsDoc(swaggerOptions)
const swaggerUiOptions = {
  swaggerOptions: {
    docExpansion: 'none' // 👈 Oculta todas las rutas al cargar
  }
}
const app = express()
if (env.Status !== 'test') {
  app.use(morgan('dev'))
}
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(eh.validJson)
if (env.Status === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions))
}
app.use(mainRouter)

app.use(eh.errorEndWare)
export default app
