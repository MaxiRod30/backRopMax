import userService from "./users.service.js";
import productService from "./products.service.js"
import cartService from "./carts.service.js"
import messageService from "./messages.service.js"
import ticketService from "./tickets.service.js"

import {usersDAO, productsDAO,messagesDAO,cartsDAO,ticketsDAO} from "../dao/factory.js"


export const usersService = new userService(usersDAO);
export const productsService = new productService(productsDAO);
export const cartsService = new cartService(cartsDAO);
export const messagesService = new messageService(messagesDAO);
export const ticketsService = new ticketService(ticketsDAO);