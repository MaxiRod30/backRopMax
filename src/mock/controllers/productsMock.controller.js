import { generateProducts } from "../mocks/products.mock.js";
import { productsService } from '../../services/index.js'

export const productsMockPost = async (req, res) => {

    
    for (let i = 0; i < 100; i++) {
        await productsService.createProduct(generateProducts());
    }
    
    const products = await productsService.getAllProducts()

    res.send(products);
  
  };