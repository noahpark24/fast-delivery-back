import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs'; //fs sirve pa leer YML
import * as YAML from 'yamljs';
import path from 'path';
const server = express();

//middlewares
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());
server.use('/api', routes);
//Swagger config
const swaggerDocument = YAML.parse(
  fs.readFileSync(path.resolve(__dirname, './docs/swagger.yml'), 'utf8')
);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectDB();
server.listen(3001, '0.0.0.0', () => {
  console.log('listening');
});

export default server;
