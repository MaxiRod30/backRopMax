import { response, request } from 'express';
import CartsManager from "../dao/mongo/manager/cartManager.js"

const cartsManager = new CartsManager();

export const cartsGet = async (req = request, res = response) => {

    const {limit} = req.query;

    const carts = await cartsManager.getCarts(limit);

    res.status(200).json({ status: "ok", data: carts });

}

export const cartsGetId = async (req = request, res = response) => {

    const cid = req.params.cid;

    const cart = await cartsManager.getCartById(cid);
    if (!cart)
        return res.status(404).json({error: "Cart no encontrado!"});
    return res.status(200).json({ status: "ok", data: cart });
}

export const cartsPost = async (req = request, res = response) => {
    
    try {
        await cartsManager.createCart(); 
        res.status(201).json({
            status: "ok",
            msg : `post API - carrito agregado`
        });

    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }
}

export const cartsPostAddProduct = async (req = request, res = response) => {
    const {cid,pid} = req.params;

    try {
        await cartsManager.addProductInCart(cid,pid)

        res.status(200).json({
            status: "ok",
            msg: `post API - Producto agregado a carrito`
        });

    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error: error})
    }
}

export const cartsDelete = async (req = request, res = response) => {
    const cid = req.params.cid;

    try {    
        await cartsManager.deleteCart(cid);
        return res.status(200).json({ msg: "Cart borrado!"});
        
    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }
}