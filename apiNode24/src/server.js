import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan';
import midd from './middlewares/appMiddlewares.js'
import mainRouter from './Routers/mainRouter.js'

const server = express();

server.use(morgan('dev'));
server.use(cors());
server.use(midd.corsConfig);
server.use(helmet())
server.use(express.json());
server.use(midd.validJson);

server.use(mainRouter);
server.use(midd.errorEndWare)

export default server;