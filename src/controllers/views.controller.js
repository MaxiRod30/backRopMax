import { response, request } from 'express';

import { productsService,cartsService } from '../services/index.js';


export const viewsGet = async (req = request, res = response) => {
	try {
		return res.status(200).render("home", {
			user: req.user.user,
			style: "styles.css",
			documentTitle: "Home",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewsGetRealTimeProducts = async (req = request, res = response) => {
	try {
		let filter = {};

		const {limit=2 , page=1, sort="asc" ,query, stock} = req.query;
	
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
		= await productsService.paginateProduct(filter, { page: page, limit: limit, sort: {price: sort}, lean: true });
	
		const products = docs
		console.log(products)
		return res.render("realTimeProducts", {
			style: "styles.css",
			documentTitle: "Socket",
			products
		});
		
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewsGetProducts = async(req = request, res = response) => {
	
	try {

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
		= await productsService.paginateProduct(filter, { page: page, limit: limit, sort: {price: sort}, lean: true });
	
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
		
		const cartId = req.user.user.cart;
		
		const productsInCart = await cartsService.getCartbyIdviews(cartId)
	
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

export const viewsFailLogin = async (req = request, res = response) => {
	try {
		return res.status(200).render("faillogin", {
			documentTitle: "FailLogin",
			msg:"Fallo al logiarse"
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}