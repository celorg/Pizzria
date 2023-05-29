import { Request, Response } from 'express';

// bcrypt
// const bcrypt = require('bcrypt');
import { genSalt,compare,hash } from 'bcrypt'

// Utils
import { createToken } from '../utils/createToken';

// Models
import { User } from '../models/User';


const register = async(req: Request, res: Response) => {

    const {name,email,password} = req.body;

    if(!email){
        throw new Error("Email incorreto")
    }

    const userExists = await User.findOne({email});

    if(userExists){
        throw new Error("Esse email já existe")
    }

    // Password
    const salt = await genSalt(12);
    const passwordHash = await hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: passwordHash
    
    })

    if(!user){
        throw new Error("Não foi possivel criar um usúario, tente mais tarde")
    }

    await createToken(user, req, res)

}

const login = async(req: Request, res: Response) => {
    
    const {email,password} = req.body;


    const user:any = await User.findOne({email: email});

    if(!user){
        throw new Error("Usúario não encontrado")
    }

    if(!(await compare(password, user.password))){
        throw new Error("Senha inválida")
    }

    await createToken(user, req, res); 

}

const detailsUser = async(req: Request, res: Response) => {

    const user_id = req.user_id;

    const user = await User.findById(user_id).select("name email _id");

    return res.status(200).json(user);

}

export {
    login,
    register,
    detailsUser
}