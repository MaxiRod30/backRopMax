import { response, request } from 'express';
import CartManager from "../models/cartManager.js"

const carts = new CartManager("Carts.json")


export const cartsGet = (req = request, res = response) => {

    let data = carts.getCarts();

    if(data){
        res.json(data);
    }else{
        res.status(404).json({error: "Cart no encontrado!"});
    }
}

export const cartsGetId = (req = request, res = response) => {

    const cid = req.params.cid;
    let data = carts.getProductInCartById(Number(cid));
    if(data){
        res.json(data);
    }else{
        res.status(404).json({error: "Cart no encontrado!"});
    }
}

export const cartsPost = (req = request, res = response) => {
    carts.addCart();
    res.status(201).json({
        "msg": `post API - carrito agregado`
    });
}

export const cartsPostAddProduct = (req = request, res = response) => {
    const {cid,pid} = req.params;

    carts.addProductInCart(cid,pid)
    res.status(201).json({
        "msg": `post API - Producto agregado a carrito`
    });
}
