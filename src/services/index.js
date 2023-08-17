import userService from "./users.service.js";
import productService from "./products.service.js"
import cartService from "./carts.service.js"
import messageService from "./messages.service.js"

import UserMemoryManager from "../dao/usersMemoryManager.js";
import UserMongoManager from "../dao/mongo/manager/usersMongoManager.js"

import ProductMemoryManager from "../dao/productMemoryManager.js"
import ProductMongoManager from "../dao/mongo/manager/productMongoManager.js"

import CartMemoryManager from "../dao/cartMemoryManager.js"
import CartMongoManager from "../dao/mongo/manager/cartMongoManager.js"

import MessageMemoryManager from "../dao/messageMemoryManager.js"
import MessageMongoManager from "../dao/mongo/manager/messageMongoManager.js"

export const usersService = new userService(new UserMongoManager());
export const productsService = new productService(new ProductMongoManager());
export const cartsService = new cartService(new CartMongoManager());
export const messagesService = new messageService(new MessageMongoManager());