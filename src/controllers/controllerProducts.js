import { response, request } from 'express';
import ProductManager from "../models/productManager.js"


const products = new ProductManager("products.json")


export const productsGet =  (req = request, res = response) => {

    const {limit } = req.query;
    let data;
    let msg;
    data = products.getProducts();

    if(limit){
        msg = data.slice(0,limit)
    }else{
        msg = data;
    }
    res.status(200).json(msg);

}

export const productsGetId =  (req = request, res = response) => {

    const pid = req.params.pid;
    let data;

    data = products.getProductById(Number(pid));
    if(data != "Not Found"){
        res.json(data);
    }else{
        res.status(404).json({error: "Producto no encontrado!"});
    }
}

export const productsPost =  (req = request , res = response) => {

    let {title,description,code,price, status, category, thumbnail, stock} = req.body;

    if(!products.isInProducts(code))
    {
        products.addProduct(title, description, price, thumbnail=[], code, stock, category, status=true)
        res.status(201).json({
            "msg": `post API - producto agregado - ${title}`
        });
    }else{
        res.status(400).json({error: "Producto repetido!"})
    }
}

export const productsPut =  (req = request , res = response) => {

    const pid = req.params.pid;
    let dataBody = req.body;
    
    const data = products.updateProduct(Number(pid),Object.keys(dataBody).toString(),Object.values(dataBody).toString());

    if(data){
        res.status(201).json({
            "msg": `put API - producto modificado`,
            "payload": data
        });
    }else{
        res.status(404).json({error: "Producto no encontrado!"});
    }
}

export const productsDelete =  (req = request , res = response) => {

    const pid = req.params.pid;
    const data = products.deleteProduct(Number(pid));

    if(data){
        res.status(200).json({
            "msg": `delete API - producto borrado`,
        });
    }else{
        res.status(404).json({error: "No se borro el producto!"});
    }
}