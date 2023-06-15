import { response, request } from 'express';

import products from "../../products.json" assert { type: "json" };

export const viewsGet = (req = request, res = response) => {
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