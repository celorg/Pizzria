import { sign } from "jsonwebtoken";
import { Request,Response } from "express";

// Dotenv
import 'dotenv/config'
const secret = process.env.JWT_SECRET

const createToken = (user: any,req: Request, res: Response) => {

    const token = sign({
        name: user.name,
        id: user._id,
        email: user.email
    }, secret, {
        expiresIn: '7d',
    })

    res.status(200).json({
        token: token,
        userId: user._id,
        name: user.name,
        email: user.email
    })


}

export {createToken}