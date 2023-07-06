import cartModel from "../models/cartModels.js";

export default class CartsManager {

    getCarts = (limite) => {
        if(limite)
            return cartModel.find().limit(limite).lean();
        return cartModel.find().lean();
    };
  
    getCartById = (id) => {
      return cartModel.findById(id);
    };

    createCart = (cart) => {
      return cartModel.create(cart);
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
          if(bandera) return cartFind.save()

          cartFind.products.push({idproduct: idProduct , quantity:1})
          return cartFind.save()

    }

    updateCart = (id, cart) => {
      return cartModel.findByIdAndUpdate(id, cart);
    };
  
    deleteCart = (cid) => {
      return cartModel.findByIdAndDelete(cid);
    };
  }