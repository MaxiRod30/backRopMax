import { response, request } from 'express';
import ProductDTO from "../DTOs/Product.dto.js"
import { productsService, cartsService, usersService } from '../services/index.js';
import logger from '../helpers/helpersLoggers.js';

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

		const { limit = 2, page = 1, sort = "asc", query, stock } = req.query;

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

		const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, ...rest }
			= await productsService.paginateProduct(filter, { page: page, limit: limit, sort: { price: sort }, lean: true });

		const products = docs
		console.log(products)
		return res.render("realTimeProducts", {
			style: "styles.css",
			documentTitle: "Socket",
			products,
			user: req.user.user,
		});

	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewsGetProducts = async (req = request, res = response) => {
	let productCart = 0
	try {
		const cartId = req.user.user.cart;
		const productsInCart = await cartsService.getCartbyIdviews(cartId)
		productsInCart.products.forEach(element => {
			productCart = element.quantity + productCart
		});

		let filter = {};

		const { limit = 6, page = 1, sort, query, stock } = req.query;

		if (query) {
			filter = {
				$or: [
					{ category: { $regex: query, $options: "i" } }
				],
			};
		}
		if (stock && !isNaN(stock)) {
			filter.stock = { $gt: Number(stock) };
		}

		const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, ...rest }
			= await productsService.paginateProduct(filter, { page: page, limit: limit, sort: { price: sort }, lean: true });

		const products = []
		docs.forEach(element => {
			const newProd = new ProductDTO(element)
			products.push(newProd)
		});
		if (totalPages >= page) {
			return res.render("products", {
				products: products,
				page: rest.page,
				hasPrevPage,
				hasNextPage,
				prevPage,
				nextPage,
				query,
				cantidadCarrito: productCart,
				user: req.user.user,
			});
		} else {
			res.render("error", {
				msg: "Error en la pagina"
			});
		}

	} catch (err) {
		return res.status(500).json({ error: err.message });
	};

}

export const viewsGetProductsInCart = async (req = request, res = response) => {
	let productCart = 0
	let totalFactura = 0
	try {

		const cartId = req.user.user.cart;
		const productsInCart = await cartsService.getCartbyIdviews(cartId)
		const products = productsInCart.products

		productsInCart.products.forEach(element => {
			productCart = element.quantity + productCart
			totalFactura = element.quantity * element.idproduct.price + totalFactura
		});

		return res.render("carts", {
			style: "styles.css",
			products,
			cantidadCarrito: productCart,
			totalfactura: totalFactura,
			user: req.user.user,
		});

	} catch (err) {
		return res.status(500).json({ error: err.message });
	};

}

export const viewChat = async (req = request, res = response) => {
	let productCart = 0
	try {
		const cartId = req.user.user.cart;
		const productsInCart = await cartsService.getCartbyIdviews(cartId)
		productsInCart.products.forEach(element => {
			productCart = element.quantity + productCart
		});

		return res.render("chat", {
			cantidadCarrito: productCart
		});

	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewLogin = async (req = request, res = response) => {
	try {

		if (req.user) {
			return res.status(200).render("home", {
				user: req.user,
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
			documentTitle: "Register"
		});

	} catch (error) {
		return res.status(500).json({ error: error.message });
	}

};

export const viewsFailLogin = async (req = request, res = response) => {
	try {
		return res.status(200).render("faillogin", {
			documentTitle: "FailLogin",
			msg: "Fallo al logiarse"
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewRestore = async (req = request, res = response) => {
	try {
		return res.status(200).render("restore", {
			documentTitle: "Restaurar contraseña",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewRestorePassword = async (req = request, res = response) => {
	try {
		return res.status(200).render("restorePassword", {
			documentTitle: "Restaurar contraseña",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewRestoreFail = async (req = request, res = response) => {
	try {
		res.clearCookie("restore")

		return res.status(200).render("failRestorePassword", {
			documentTitle: "Error",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewsFailProduct = async (req = request, res = response) => {
	try {
		return res.status(200).render("failproduct", {
			documentTitle: "FailProduct",
			msg: "Producto no registrado",
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewProfile = async (req = request, res = response) => {
	try {
		const { view } = req.query;
		if (req.user.user.rol == "USER_ROLE") {
			view = "info"
		}
		let filter = {};

		const { limit = 6, page = 1, sort, query, stock } = req.query;

		if(req.user.user.rol != "ADMIN_ROLE"){
			filter = {
				$or: [
					{ owner: { $regex: req.user.user.email, $options: "i" } }
				],
			};
		}
		if (stock && !isNaN(stock)) {
			filter.stock = { $gt: Number(stock) };
		}

		const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, ...rest }
			= await productsService.paginateProduct(filter, { page: page, limit: limit, sort: { price: sort }, lean: true });

		const products = []
		docs.forEach(element => {
			const newProd = new ProductDTO(element)
			products.push(newProd)
		});

		return res.status(200).render("profile", {
			documentTitle: "Profile",
			user: req.user.user,
			view: view,
			products: products,
			page: rest.page,
			hasPrevPage,
			hasNextPage,
			prevPage,
			nextPage,
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewProfileUser = async (req = request, res = response) => {
	try {

		return res.status(200).render("profileUser", {
			documentTitle: "Profile",
			user: req.user.user,
		});

	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}

export const viewUserList = async (req = request, res = response) => {
	try {
		const lista = await usersService.getAllUsers()

		return res.status(200).render("listUsers", {
			documentTitle: "List",
			user: req.user.user,
			listUsers: lista
		});

	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
}