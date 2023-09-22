export default class serviceProducts {
    constructor(dao) {
      this.dao = dao;
    }
  
    getAllProducts = (limit) => {
      return this.dao.getProducts(limit);
    };
  
    getProductsbyId = (id) => {
      return this.dao.getProductsById(id);
    };

    getProductsbyCode = (code) =>{
      return this.dao.getProductsByCode(code);
    }

    createProduct = (product) =>{
      return this.dao.createProducts(product);
    }

    updateproducts = (id, product) =>{
        return this.dao.updateProducts(id, product);
    }
    
    deleteProductbyId = (id) =>{
        return this.dao.deleteProducts(id);
    }

    paginateProduct = (filter,data) =>{
        return this.dao.paginateData(filter, data);
    }
  }
  