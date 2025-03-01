import server from "./src/app.js";
import env from "./src/Configs/envConfig.js"
//import {  startApp, gracefulShutdown } from "./src/Configs/db.js"

async function start (){}
try {
    //await startApp()
    server.listen({ port: env.Port})
    console.log(`Server is listening on http://localhost:${env.Port}\nServer in ${env.Status}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  start()