import cartModel from "../models/cartModels.js";
import productModel from "../models/productModels.js"

export default class CartsManager {

    getCarts = (limite) => {
        if(limite)
            return cartModel.find().limit(limite).lean();
        return cartModel.find().lean();
    };
  
    getCartById = (id) => {
      return cartModel.findById(id);
    };

    getCartByIdviews = (id) => {
      return cartModel.findById(id).populate('products.idproduct').lean();
    };

    createCart = async(cart) => {
       const cartNew = await cartModel.create(cart)
       return cartNew
    };
  
    addProductInCart = async (idCart,idProduct)=>{
        let bandera = false
        const cartFind = await this.getCartById(idCart)

          cartFind.products.forEach((e)=>{
            if(e.idproduct == idProduct){
                e.quantity = e.quantity + 1
                bandera = true
            }
          })
          if(bandera) return  cartFind.save()

          cartFind.products.push({idproduct: idProduct , quantity:1})

          return  cartFind.save()
    }

    updateCart = (id, cart) => {
      return cartModel.findByIdAndUpdate(id, cart);
    };
  
    updateProductInCart= async (idCart,idProduct,quantity)=>{

        const cartFind = await this.getCartById(idCart)
        const productFind = await productModel.findById(idProduct)

        if (productFind.stock >= quantity){
          cartFind.products.forEach((e)=>{
            if(e.idproduct == idProduct){
                e.quantity = quantity
            }
          })

          await cartFind.save()
          return true
        }
        return false
    }

    deleteCart = (cid) => {
      return cartModel.findByIdAndDelete(cid);
    };

    deleteProductCart = async (cartId,productId) => {

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
      cartFind.products.splice(0,cartFind.products.length)
      return await cartFind.save()
    };
    
  }