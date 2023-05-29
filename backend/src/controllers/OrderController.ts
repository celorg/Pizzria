import { Order } from "../models/Order";
import { Item } from "../models/Item";
import { Request,Response } from "express";

const createOrder = async(req:Request, res:Response) => {

    const { table,name } = req.body;

    if(!table){
        throw new Error("O número da mesa é obrigatório")
    }

    const order = await Order.create({
        table,
        name
    })

    if(!order){
        throw new Error("Não foi possível criar um pedido, tente mais tarde")
    }

    res.status(201).json(order);

}

const deleteOrder = async(req:Request, res:Response) => {

    const {id} = req.params;
    
    const order = await Order.findById(id);

    if(!order){
        throw new Error("Esse pedido não existe")
    }

    await Order.findByIdAndDelete(order._id);
    
    res.status(200).json({message: "Pedido deletado com sucesso"})

}

const sendOrder = async(req:Request, res: Response) => {

    const {id} = req.params;

    try{

        const order = await Order.findById(id);

        order.draft = false;

        await Order.findByIdAndUpdate(order._id, order)

        res.status(200).json(order)

    }catch(err){
        throw new Error("Pedido não encontrado")
    }

}

const latestOrders = async(req: Request, res:Response) => {

    const orders = await Order.where({draft: false, status: false}).sort("-createdAt").select("_id table status draft name");

    res.status(200).json(orders);

}

const detailsOrder = async(req: Request, res:Response) => {
    
    const {id} = req.params;

    const items = await Item.find({order_id: id}).sort("-createdAt");

    const order = await Order.findById(id)

    const list = {
        table: order.table,
        _id: order._id,
        name: order.name,
        status: order.status,
        draft: order.draft,
        items: items
    }

    res.status(200).json(list);

}

const finishOrder = async(req:Request, res:Response) => {

    const {id} = req.params;

    try{

        let order = await Order.findById(id);

        order.status = true;
        
        await Order.findByIdAndUpdate(order._id, order);

        res.status(200).json(order);

    }catch(err){
        throw new Error("Pedido não encontrado")
    }

}

export {
    createOrder,
    deleteOrder,
    sendOrder,
    latestOrders,
    detailsOrder,
    finishOrder
}