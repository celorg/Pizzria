import express, {Request, Response, NextFunction} from "express";
import 'express-async-errors';
import path from 'path';

import cors from 'cors'

import { router } from "./rotas/routes";

require('dotenv').config({ path: __dirname+'/../.env' });

const port = process.env.PORT

const app = express();

// Json
app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.use(cors({credentials: true, origin: 
    [
        "http://localhost:3000", 
        "http://localhost:19006"
    ]
}));

// Public
app.use('/files', express.static( path.resolve(__dirname, "..", "public")));

// Routes
app.use(router);

// DB
require('./db/config');

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        // Se for uma instacia de um tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(port, () => {
    console.log("Servidor rodando com sucesso, porta: " + port)
})