
import productModel from "../models/productModels.js";

export default class ProductsManager {

    getProducts = async (limite) => {
        if(limite)
            return await productModel.find().limit(limite).lean();
        return await productModel.find().lean();
    };
  
    getProductsById = async (id) => {
      return await productModel.findById(id);
    };
  
    getProductsByCode = async (code) => {
        return await productModel.find({code});
      };

    createProducts = async (product) => {
      return await productModel.create(product);
    };
  
    updateProducts = async (id, product) => {
      return await productModel.findByIdAndUpdate(id, product);
    };
  
    deleteProducts = async (id) => {
      return await productModel.findByIdAndDelete(id);
    };
    
    paginateData = async (data) => {
      return await productModel.paginate(data);
    };


  }