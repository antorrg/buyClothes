import Fastify from 'fastify'
import pino from "pino"



const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    },
  })

server.addHook('onRequest', (req, reply, done) => {
    req.log.info({ url: req.raw.url, id: req.id }, 'received request')
    done()
  })
  
  server.addHook('onResponse', (req, reply, done) => {
    req.log.info({ statusCode: reply.raw.statusCode }, 'request completed')
    done()
  })
  
// Declare a route
server.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})


export default server;
