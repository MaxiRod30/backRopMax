export default class serviceCarts {
    constructor(dao) {
      this.dao = dao;
    }
  
    getAllCarts = (limit) => {
      return this.dao.getCarts(limit);
    };
  
    getCartbyId = (id) => {
      return this.dao.getCartById(id);
    };

    getCartbyIdviews = (id) =>{
      return this.dao.getCartByIdviews(id);
    }

    createcart = (cart) =>{
      return this.dao.createCart(cart);
    }

    addProductinCart = (idCart,idProduct) =>{
        return this.dao.addProductInCart(idCart,idProduct);
    }
    
    updatecart = (id, cart) =>{
        return this.dao.updateCart(id, cart);
    }

    updateProductinCart = (idCart,idProduct,quantity) =>{
        return this.dao.updateProductInCart(idCart,idProduct,quantity);
    }

    deletecart = (cid) =>{
        return this.dao.deleteCart(cid);
    }

    deleteproductCart = (cartId,productId) =>{
        return this.dao.deleteProductCart(cartId,productId);
    }

    deleteAllproducts = (cid) =>{
        return this.dao.deleteAllProducts(cid);
    }

  }
  