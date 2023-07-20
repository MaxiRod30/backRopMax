import { response, request } from 'express';
import ProductsManager from "../dao/mongo/manager/productManager.js";
import CartsManager from '../dao/mongo/manager/cartManager.js';
import productModel from '../dao/mongo/models/productModels.js';

const productsManager = new ProductsManager();
const cartsManager = new CartsManager();

export const viewsGet = async (req = request, res = response) => {
	try {


		if(!req.session.user){
			return res.status(200).render("login", {
				style: "styles.css",
				documentTitle: "Login",
			});
		};

		return res.status(200).render("home", {
			user: req.session.user,
			style: "styles.css",
			documentTitle: "Home",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewsGetRealTimeProducts = (req = request, res = response) => {
	try {
		if(!req.session.user){
			return res.status(200).render("login", {
				style: "styles.css",
				documentTitle: "Login",
			});
		};

		return res.render("realTimeProducts", {
			style: "styles.css",
			documentTitle: "Socket",
		});
		
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewsGetProducts = async(req = request, res = response) => {
	
	try {
		if(!req.session.user){
			return res.status(200).render("login", {
				style: "styles.css",
				documentTitle: "Login",
			});
		};
		
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
		
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};	

}

export const viewsGetProductsInCart = async(req = request, res = response) => {
	try {
		if(!req.session.user){
			return res.status(200).render("login", {
				style: "styles.css",
				documentTitle: "Login",
			});
		};

		const cartId = req.params.cid;
		const productsInCart = await cartsManager.getCartByIdviews(cartId)
	
		const products = productsInCart.products
	
		return res.render("carts", {
			style: "styles.css",
			products
		});
		
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};	

}

export const viewChat = (req = request, res = response) => {
	
	try {
		if(!req.session.user){
			return res.status(200).render("login", {
				style: "styles.css",
				documentTitle: "Login",
			});
		};
		return res.render("chat", { });
		
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};	
}

export const viewLogin = async (req = request, res = response) => {
	try {
		if(req.session.user){
			return res.status(200).render("home", {
				user: req.session.user,
				style: "styles.css",
				documentTitle: "Home",
			});
		};

		return res.status(200).render("login", {
			style: "styles.css",
			documentTitle: "Login",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};

export const viewRegister = async (req = request, res = response) => {
	try {
		return res.status(200).render("register", {
			style: "styles.css",
			documentTitle: "Register",
		});

	} catch (error) {
		return res.status(500).json({ error: err.message });
	}
};