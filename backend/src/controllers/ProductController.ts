import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { Request,Response } from "express";

const createProduct = async(req:Request, res:Response) => {

    const {name, price, description, category_id} = req.body;

    if(!req.file){
        throw new Error("A imagem é obrigatória!!")
    }

    if(name.length < 3 ){
        throw new Error("O nome deve ter no mínimo 3 caracteres")
    }

    if(!price){
        throw new Error("O preço é obrigatório")
    }

    if(description.length < 5){
        throw new Error("A descrição deve ter no mínino 5 caracteres");
    }

    const productExists = await Product.findOne({name: name});

    if(productExists){
        throw new Error("Já existe um produto com esse nome!")
    }

    if(!category_id){
        throw new Error("A categoria é obrigatória")
    }

    const { originalname, filename:banner } = req.file;


    const category = await Category.findById(category_id).select("name _id");

    if(!category){
        throw new Error("Essa categoria não existe!!")
    }

    const product = await Product.create({
        name,
        price,
        description,
        category: {
            name: category.name,
            _id: category._id
        },
        banner: banner,
    })

    if(!product){
        throw new Error("Não foi possivel o produto, tente mais tarde")
    }

    res.status(200).json(product)

}

const getProductsByCategory = async(req: Request, res:Response) => {
    const {id} = req.params;

    const category = await Category.findById(id);

    const products = await Product.find({'category._id': category._id}).sort("+createdAt").select('banner _id description name price');

    res.status(200).json(products);
}

const deleleProduct = async(req:Request, res: Response) => {

    const { id } = req.params;

    const product = await Product.findById(id);

    if(!product){
        throw new Error("Esse produto não existe")
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({message: 'Produto removido com sucesso'})

}

export {
    createProduct,
    getProductsByCategory,
    deleleProduct
}