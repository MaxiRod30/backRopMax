import { response, request } from 'express';
import { cartsService } from '../services/index.js';
import { productsService } from '../services/index.js';
import { ticketsService } from '../services/index.js';
import TicketDTO from '../DTOs/Ticket.dto.js'
import logger from '../helpers/helpersLoggers.js';


export const cartsGet = async (req = request, res = response) => {

    const { limit } = req.query;

    const carts = await cartsService.getAllCarts(limit);

    res.status(200).json({ status: "ok", data: carts });

}

export const cartsGetId = async (req = request, res = response) => {

    const cid = req.params.cid;

    const cart = await cartsService.getCartbyIdviews(cid);
    if (!cart)
        return res.status(404).json({ error: "Cart no encontrado!" });
    return res.status(200).json({ status: "ok", data: cart });
}

export const cartsPost = async (req = request, res = response) => {

    try {
        await cartsService.createcart();
        res.status(201).json({
            status: "ok",
            msg: `post API - carrito agregado`
        });

    } catch (error) {
        return res.status(404).json({ msg: "Error en Base de datos!", error })
    }
}

export const cartsPostAddProduct = async (req = request, res = response) => {
    const { cid, pid } = req.params;

    try {
        const prod = await productsService.getProductsbyId(pid)
        if (prod.stock < 1) {
            return res.status(200).json({
                status: "success",
                error: "Sin stock"
            });
        }
        await cartsService.addProductinCart(cid, pid)

        res.status(200).json({
            status: "success",
            msg: `post API - Producto agregado a carrito`
        });

    } catch (error) {
        return res.status(404).json({ msg: "Error en Base de datos!", error: error })
    }
}

export const cartsPostPurchase = async (req = request, res = response) => {
    const { cid } = req.params;
    try {
        let productsOutOfStock = []
        let productsPurchased = []
        let total = 0;
        let updateProd

        const cart = await cartsService.getCartbyId(cid)

        if (cart.products.length == 0) {
            return res.status(200).json({
                status: "ok",
                error: "No tiene productos en el carrito"
            });
        }

        for (const product of cart.products) {
            const prod = await productsService.getProductsbyId(product.idproduct)
            if (product.quantity <= prod.stock && prod) {
                prod.stock = prod.stock - product.quantity
                total += prod.price * product.quantity
                updateProd = await productsService.updateproducts(product.idproduct, prod)
                const deleteCart = await cartsService.deleteproductCart(cid, product.idproduct)
                productsPurchased.push(product)
            } else {
                productsOutOfStock.push(product)
            }
        }
        logger.info(productsPurchased)
        if (productsPurchased.length != 0) {
            const ticketNew = new TicketDTO(total, req.user.user, productsPurchased)
            const ticket = await ticketsService.createPurchaseTicket(ticketNew)
        }

        return res.status(200).json({
            status: "success",
            productsOutOfStock,
            productsPurchased,
            total
        });


    } catch (error) {
        return res.status(404).json({ msg: "Error en Base de datos!", error: error })
    }
}

export const cartsPutUpdate = async (req = request, res = response) => {

    const { cid } = req.params;
    let data = req.body;

    try {
        const result = await cartsService.updatecart(cid, data)

        res.status(200).json({
            status: "ok",
            msg: `put API - Productos del carrito actualizado`
        });

    } catch (error) {
        return res.status(404).json({ msg: "PUT- Error en Base de datos!", error: error })
    }
}

export const cartsPutUpdateProduct = async (req = request, res = response) => {

    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {

        const updateProduct = await cartsService.updateProductinCart(cid, pid, quantity)

        if (updateProduct) {
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
        return res.status(404).json({ msg: "Error en Base de datos!", error: error })
    }
}

export const cartsDelete = async (req = request, res = response) => {
    const cid = req.params.cid;

    try {
        await cartsService.deletecart(cid);
        return res.status(200).json({ status: "ok", msg: "Cart borrado!" });

    } catch (error) {
        return res.status(404).json({ msg: "Error en Base de datos!", error })
    }
}

export const cartsDeleteProductById = async (req = request, res = response) => {

    const { cid, pid } = req.params;

    try {
        await cartsService.deleteproductCart(cid, pid)

        res.status(200).json({
            status: "ok",
            msg: `delete API - Producto borrado del carrito`
        });

    } catch (error) {
        return res.status(404).json({ msg: "Error al borrar el producto!", error: error })
    }
}

export const cartsDeleteAllProducts = async (req = request, res = response) => {

    const cid = req.params.cid;

    try {
        await cartsService.deleteAllproducts(cid);
        return res.status(200).json({
            status: "ok",
            msg: `delete API - Productos borrados del carrito`
        });

    } catch (error) {
        return res.status(404).json({ msg: "Error en Base de datos!", error })
    }
}
