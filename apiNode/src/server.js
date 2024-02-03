import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {corsConfig, validJson, errorEndWare} from './utils/index'
import mainRouter from './Routers/mainRouter'

const server = express();

server.use(cors());
server.use(corsConfig);
server.use(morgan('dev'));
server.use(express.json());
server.use(validJson);

server.use(mainRouter);
server.use(errorEndWare)

export default server;