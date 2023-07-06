import { response, request } from 'express';
import ProductsManager from "../dao/mongo/manager/productManager.js";

const productsManager = new ProductsManager();

export const productsGet = async (req = request, res = response) => {

    const {limit} = req.query;

    const products = await productsManager.getProducts(limit);

    res.status(200).json({ status: "ok", data: products });

}

export const productsGetId = async (req = request, res = response) => {

    const pid = req.params.pid;

    const product = await productsManager.getProductsById(pid);
    if (!product)
        return res.status(404).json({error: "Producto no encontrado!"});
    return res.status(200).json({ status: "ok", data: product });
}

export const productsPost = async(req = request , res = response) => {

    let {title,description,code,price, status, category, thumbnail, stock} = req.body;
    
    try {
        const productFound = await productsManager.getProductsByCode(code)
        if(!productFound)
            return res.status(400).json({error: "Producto repetido!"})
        
        const newProduct = {
            title,
            description,
            code,
            price, 
            status: status ?? true, 
            category, 
            thumbnail : thumbnail ?? "[]", 
            stock
        }
        
        productsManager.createProducts(newProduct)
    
        return res.status(201).json({ msg: "post API - producto agregado", data: newProduct });
    
    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }
}

export const productsPut = async (req = request , res = response) => {

    const pid = req.params.pid;
    const { title, description, code, price, status, category, thumbnail, stock} = req.body;
    
    if (!title || !description || !code || !price || !status || !category ||!thumbnail ||!stock){
      return res.status(400).json({ status: "error", message: "No data sent!" });
    }

    try {
        const newProduct = req.body;
        await companiesManager.updateCompany(pid, newProduct);
        res.status(201).json({ status: "ok", data: newProduct });
    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }

}

export const productsDelete = async (req = request , res = response) => {

    const pid = req.params.pid;

    try {    
        await productsManager.deleteProducts(pid);
        return res.status(200).json({ msg: "Producto borrado!"});
        
    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }
}