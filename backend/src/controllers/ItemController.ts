import { Item } from "../models/Item";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { Request,Response } from "express";

const addItems = async(req:Request, res:Response) => {

    const {order_id,product_id,amount} = req.body;

    if(!order_id){
        throw new Error("O id do pedido é obrigatório")
    }

    if(!product_id){
        throw new Error("O produto deve ser obrigatório")
    }

    const order = await Order.findById(order_id);

    if(!order){
        throw new Error("Esse pedido não existe")
    }

    const product = await Product.findById(product_id);

    if(!product){
        throw new Error("Esse produto não existe")
    }

    const item = await Item.create({
        order_id: order._id,
        product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description
        },
        amount
    })

    if(!item){
        throw new Error("Houve um erro, por favor tente mais tarde!")
    }

    res.status(200).json(item)

}

const removeItem = async(req:Request, res:Response) => {

    const { id } = req.params;

    try{

        const item = await Item.findById(id);

        if(!item){
            throw new Error("Esse item não existe")
        }

        await Item.findByIdAndDelete(item._id);

        res.status(200).json({message: "Item removido com sucesso!!"})

    }catch(err){
        throw new Error("Produto não existe")
    }
}

export {
    addItems,
    removeItem,
}