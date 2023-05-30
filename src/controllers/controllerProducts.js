import { response, request } from 'express';
import ProductManager from "../models/productManager.js"

export const productsGet = (req = request, res = response) => {

    const {limit } = req.query;

    let data;
    let msg;

    const productos = new ProductManager("data.json");
    data = productos.getProducts();

    if(limit){
        msg = data.slice(0,limit)
    }else{
        msg = data;
    }

    res.json(msg);
}

export const productsGetId = (req = request, res = response) => {

    const pid = req.params.pid;
    let data;

    const productos = new ProductManager("data.json");
    data = productos.getProductById(Number(pid));

    res.json(data);
}