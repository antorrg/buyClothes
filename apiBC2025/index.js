import app from './src/app.js'
import env from './src/Configs/envConfig.js'
import { startApp } from './src/Configs/database.js'

app.listen(env.Port, async () => {
  try {
    startApp()
    console.log(`Server running on http://localhost:${env.Port}\nServer in ${env.Status}`)
    if (env.Status === 'development') {
      console.log(`Swagger: View and test endpoints in http://localhost:${env.Port}/api-docs`)
    }
  } catch (error) {
    console.error('Error conecting DB: ', error)
    process.exit(1)
  }
})
