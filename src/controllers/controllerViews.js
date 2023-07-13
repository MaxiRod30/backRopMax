import { response, request } from 'express';
import ProductsManager from "../dao/mongo/manager/productManager.js";
import CartsManager from '../dao/mongo/manager/cartManager.js';
import productModel from '../dao/mongo/models/productModels.js';

const productsManager = new ProductsManager();
const cartsManager = new CartsManager();

export const viewsGet = async (req = request, res = response) => {
	res.render("home", {
		style: "styles.css",
		documentTitle: "Home",
	});

}

export const viewsGetRealTimeProducts = (req = request, res = response) => {
	res.render("realTimeProducts", {
		style: "styles.css",
		documentTitle: "Socket",
	});
}

export const viewsGetProducts = async(req = request, res = response) => {

    let filter = {};

    const {limit=2 , page=1, sort ,query, stock} = req.query;

    if (query) {
        filter = {
          $or: [
            { category: { $regex: query, $options: "i" } },
            { title: { $regex: query, $options: "i" } }
          ],
        };
      }
	  if (stock && !isNaN(stock)) {
        filter.stock = { $gt: Number(stock) };
    }

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages ,...rest } 
    = await productModel.paginate(filter, { page: page, limit: limit, sort: {price: sort}, lean: true });

	const products = docs
	if(totalPages >= page){
		res.render("products", {
			products,
			page: rest.page,
			hasPrevPage,
			hasNextPage,
			prevPage,
			nextPage,
			query
		});
	}else{
		res.render("error", {
			msg: "Error en la pagina"
		});
	}
}

export const viewsGetProductsInCart = async(req = request, res = response) => {

    const cartId = req.params.cid;
	const productsInCart = await cartsManager.getCartByIdviews(cartId)

	const products = productsInCart.products

	res.render("carts", {
		style: "styles.css",
		products
	});
}

export const viewChat = (req = request, res = response) => {
	res.render("chat", { });
}
