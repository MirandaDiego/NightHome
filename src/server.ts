import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path'; //biblioteca para pegar o arquivo na pasta certa
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import mustache from 'mustache-express'

dotenv.config();

const server = express();

server.use(cors());
server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views')); //path - > caminho absoluto
server.engine('mustache', mustache())

server.use(express.static(path.join(__dirname, '../public'))); 

server.use(express.urlencoded({ extended: true }));

 

server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use(apiRoutes);


server.use((req:Request, res:Response)=>{
    res.status(404)
    res.send('Página não encontrada.')
})
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); 
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

server.listen(process.env.PORT);

