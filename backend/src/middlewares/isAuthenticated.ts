import { NextFunction, Request,Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../models/User";

// Dotenv
import 'dotenv/config'
const secret = process.env.JWT_SECRET

interface Payload{
    id: string;
}

export const isAuthenticated = async( req:Request, res:Response, next:NextFunction ) => {

    const authToken = req.headers.authorization;

    if(!authToken){
        res.status(401).json({error: ["Acesso negado"]})
    }

    const token = authToken && authToken.split(" ")[1];

    try{

        const decoded:any = verify(token, secret);

        req.user_id = decoded.id

        return next();

    }catch(err:any){
        res.status(401).json({error: ["Acesso negado"]})
    }

}

