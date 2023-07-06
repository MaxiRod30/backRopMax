import { response, request } from 'express';
import ProductsManager from "../dao/mongo/manager/productManager.js";

const productsManager = new ProductsManager();


export const viewsGet = async (req = request, res = response) => {
	const products = await productsManager.getProducts()
	res.render("home", {
		style: "styles.css",
		documentTitle: "Home",
		products
	});

}

export const viewsGetRealTimeProducts = (req = request, res = response) => {
	res.render("realTimeProducts", {
		style: "styles.css",
		documentTitle: "Socket",
	});
}

export const viewsGetProducts = async(req = request, res = response) => {
	
	const products = await productsManager.getProducts()

	res.render("products", {
		style: "styles.css",
		products
	});
}

export const viewChat = (req = request, res = response) => {
	res.render("chat", { });
}
