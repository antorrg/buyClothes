import env from '../envConfig.js'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'buyClothes',
      version: '1.0.0',
      description: 'Documentación de mi API buyClothes con Swagger. Es necesario primero hacer login...(vea Readme.md)'
    },

    servers: [
      {
        url: `http://localhost:${env.Port}`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/Configs/swaggerDocs/schemas/product.jsdoc.js'], // Ruta a tus archivos de rutas
  swaggerOptions: {
    docExpansion: 'none' // 👈 Oculta todas las rutas al cargar
  }
}

export default swaggerOptions
