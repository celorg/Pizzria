import { Category } from '../models/Category';
import { Request, Response } from 'express';

const createCategory = async(req: Request, res:Response) => {

    const {name} = req.body;

    if(!name){
        throw new Error("Nome Inválido")
    }

    if(name.length < 3){
        throw new Error("O nome deve ter no mínimo 3 caracteres")
    }

    const categoryExists = await Category.findOne({name})

    if(categoryExists){
        throw new Error("Essa categoria já existe")
    }

    const category = await Category.create({
        name: name
    })

    if(!category){
        throw new Error("Não foi possivel criar a categoria")
    }

    res.status(200).json(category);
}

const getAllCategories = async(req: Request, res:Response) => {

    const categories = await Category.find({}).select("name _id");

    res.status(200).json(categories)

}

export {
    createCategory,
    getAllCategories,
}