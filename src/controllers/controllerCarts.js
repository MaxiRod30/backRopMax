import { response, request } from 'express';
import CartsManager from "../dao/mongo/manager/cartManager.js"

const cartsManager = new CartsManager();

export const cartsGet = async (req = request, res = response) => {

    const {limit} = req.query;

    const carts = await cartsManager.getCarts(limit).populate('products.idproduct');

    res.status(200).json({ status: "ok", data: carts });

}

export const cartsGetId = async (req = request, res = response) => {

    const cid = req.params.cid;

    const cart = await cartsManager.getCartById(cid).populate('products.idproduct');
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

export const cartsPutUpdate = async (req = request, res = response) => {
    
    const {cid} = req.params;
    let data = req.body;

    try {
        await cartsManager.updateCart(cid,data)

        res.status(200).json({
            status: "ok",
            msg: `put API - Productos del carrito actualizado`
        });

    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error: error})
    }
}

export const cartsPutUpdateProduct = async (req = request, res = response) => {
    
    const {cid,pid} = req.params;
    const {quantity} = req.body;

    try {

        const updateProduct = await cartsManager.updateProductInCart(cid,pid,quantity)

        if(updateProduct){
            return res.status(200).json({
                    status: "ok",
                    msg: `put API - La cantidad del producto fue actualizada`
                });
        }
        return res.status(404).json({
            status: "ok",
            msg: `put API - No hay stock para esa cantidad`
        });

    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error: error})
    }
}

export const cartsDelete = async (req = request, res = response) => {
    const cid = req.params.cid;

    try {    
        await cartsManager.deleteCart(cid);
        return res.status(200).json({ status: "ok", msg: "Cart borrado!"});
        
    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }
}

export const cartsDeleteProductById = async (req = request, res = response) => {

    const {cid,pid} = req.params;

    try {
        await cartsManager.deleteProductCart(cid,pid)

        res.status(200).json({
            status: "ok",
            msg: `delete API - Producto borrado del carrito`
        });

     } catch (error) {
         return res.status(404).json({msg: "Error al borrar el producto!", error: error})
    }
}

export const cartsDeleteAllProducts = async (req = request, res = response) => {

    const cid = req.params.cid;

    try {    
        await cartsManager.deleteAllProducts(cid);
        return res.status(200).json({             
            status: "ok",
            msg: `delete API - Productos borrados del carrito`
        });
        
    } catch (error) {
        return res.status(404).json({msg: "Error en Base de datos!", error})
    }
}
