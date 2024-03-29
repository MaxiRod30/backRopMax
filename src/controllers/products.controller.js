import { response, request } from 'express';

import { productsService } from '../services/index.js';
import logger from '../helpers/helpersLoggers.js';

export const productsGet = async (req = request, res = response) => {
    
    let filter = {};

    const {limit=10 , page=1, sort ,query, stock} = req.query;


    if (query) {
        filter = {
          $or: [
            { category: { $regex: query, $options: "i" } },
            { code: { $regex: query, $options: "i" } },
            { title: { $regex: query, $options: "i" } }
          ],
        };
      }

    if (stock && !isNaN(stock)) {
        filter.stock = { $gt: Number(stock) };
    }

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages ,...rest } 
    = await productsService.paginateProduct(filter, { page: page, limit: limit, sort: {price: sort}, lean: true });

    res.status(200).json({ 

        status: "success", 
        payload: docs,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: rest.page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: hasPrevPage? `/?page=${prevPage}`: null,
        nextLink: hasNextPage? `/?page=${nextPage}`: null,
     });

}

export const productsGetId = async (req = request, res = response) => {

    const pid = req.params.pid;

    const product = await productsService.getProductsbyId(pid);
    if (!product)
        return res.status(404).json({error: "Producto no encontrado!"});
    return res.status(200).json({ status: "success", data: product });
}

export const productsPost = async(req = request , res = response) => {

    let {title,description,code,price, status, category, thumbnail, stock } = req.body;
    const { user } = req.user;
    
    try {

        const productFound = await productsService.getProductsbyCode(code)
        if(!productFound)
            return res.status(400).json({error: "Producto repetido!"})
        
        const newProduct = {
            title,
            description,
            code,
            price, 
            status: true, 
            category, 
            thumbnail : thumbnail ?? "[]", 
            stock,
            owner: user.email
        }
        
        await productsService.createProduct(newProduct)
    
        return res.status(201).json({ msg: "post API - producto agregado", data: newProduct });
    
    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }
}

export const productsPut = async (req = request , res = response) => {

    const pid = req.params.pid;
    const { title, description, code, price, status, category, thumbnail, stock} = req.body;
    
    if (!title || !description || !price || !status || !category ||!thumbnail ||!stock){
      return res.status(400).json({ status: "error", message: "No data sent!" });
    }

    try {
        const newProduct = req.body;
        await productsService.updateproducts(pid, newProduct);
        res.status(201).json({ status: "ok", data: newProduct });
    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }

}

export const productsDelete = async (req = request , res = response) => {

    const pid = req.params.pid;
    const user = req.user.user

    try {    

        const product = await productsService.getProductsbyId(pid)
        logger.error(product)

        if (product.owner == user.email){
            if(user.rol == "PREMIUM_ROLE"){
                await productsService.deleteProductbyId(pid);
                return res.status(200).json({status:"success", owner: user.owner, msg: "Producto borrado!"});
            }
        }
        
        if(user.rol == "ADMIN_ROLE"){
            await productsService.deleteProductbyId(pid);
                return res.status(200).json({ status:"success", owner: user.owner, msg: "Producto borrado!"});
        }
       
        return res.status(404).json({ status:"error" , msg: "Producto no borrado por temas de privilegios!"});
        
    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }
}