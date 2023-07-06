
import productModel from "../models/productModels.js";

export default class ProductsManager {

    getProducts = (limite) => {
        if(limite)
            return productModel.find().limit(limite).lean();
        return productModel.find().lean();
    };
  
    getProductsById = (id) => {
      return productModel.findById(id);
    };
  
    getProductsByCode = (code) => {
        return productModel.find({code});
      };

    createProducts = (product) => {
      return productModel.create(product);
    };
  
    updateProducts = (id, product) => {
      return productModel.findByIdAndUpdate(id, product);
    };
  
    deleteProducts = (id) => {
      return productModel.findByIdAndDelete(id);
    };
  }