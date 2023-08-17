import cartModel from "../models/cartModels.js";
import { productsService } from '../../../services/index.js';

export default class CartsManager {

  getCarts = async (limite) => {
    if (limite)
      return cartModel.find().limit(limite).populate('products.idproduct').lean();

    return cartModel.find().populate('products.idproduct').lean();
  };

  getCartById = async (id) => {
    return await cartModel.findById(id);
  };

  getCartByIdviews = async (id) => {
    return await cartModel.findById(id).populate('products.idproduct').lean();
  };

  createCart = async (cart) => {
    const cartNew = await cartModel.create(cart)
    return cartNew
  };

  addProductInCart = async (idCart, idProduct) => {
    let bandera = false
    const cartFind = await this.getCartById(idCart)

    cartFind.products.forEach((e) => {
      if (e.idproduct == idProduct) {
        e.quantity = e.quantity + 1
        bandera = true
      }
    })
    if (bandera) return cartFind.save()

    cartFind.products.push({ idproduct: idProduct, quantity: 1 })

    return cartFind.save()
  }

  updateCart = async (id, cart) => {
    return await cartModel.findByIdAndUpdate(id, cart);
  };

  updateProductInCart = async (idCart, idProduct, quantity) => {

    const cartFind = await this.getCartById(idCart)
    const productFind = await productsService.getProductsbyId(idProduct)

    if (productFind.stock >= quantity) {
      cartFind.products.forEach((e) => {
        if (e.idproduct == idProduct) {
          e.quantity = quantity
        }
      })

      await cartFind.save()
      return true
    }
    return false
  }

  deleteCart = async (cid) => {
    return await cartModel.findByIdAndDelete(cid);
  };

  deleteProductCart = async (cartId, productId) => {

    const cartFind = await this.getCartById(cartId)

    const productIndex = cartFind.products.findIndex(
      (product) => product.idproduct === productId
    );

    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cartFind.products.splice(productIndex, 1);

    return await cartFind.save();
  }

  deleteAllProducts = async (cid) => {

    const cartFind = await this.getCartById(cid)
    cartFind.products.splice(0, cartFind.products.length)
    return await cartFind.save()
  };

}