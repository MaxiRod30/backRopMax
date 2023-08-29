import mongoConnect from "../dao/mongo/config.js";
import { persistence } from "../config/app.config.js";


let usersDAO;
let cartsDAO;
let productsDAO;
let messagesDAO;
let ticketsDAO;

switch (persistence) {
  case "memory":

    const { default: MemoryUsersDAO } = await import("./memory/manager/usersMemoryManager.js");
    usersDAO = new MemoryUsersDAO();
    
    const { default: MemoryCartsDAO } = await import("./memory/manager/cartMemoryManager.js");
    cartsDAO = new MemoryCartsDAO();
    
    const { default: MemoryProductsDAO } = await import("./memory/manager/productMemoryManager.js");
    productsDAO = new MemoryProductsDAO();
    
    const { default: MemoryMessagesDAO } = await import("./memory/manager/messageMemoryManager.js");
    messagesDAO = new MemoryMessagesDAO();

    const {default: MemoryTicketsDAO} =  await import("../dao/memory/manager/ticketMemoryManager.js");
    ticketsDAO = new MemoryTicketsDAO();

    break;
    
  case "mongo":

    mongoConnect();
    const { default: MongoUsersDAO } = await import("../dao/mongo/manager/usersMongoManager.js");
    usersDAO = new MongoUsersDAO();

    const {default: MongoProductsDAO} = await import("../dao/mongo/manager/productMongoManager.js");
    productsDAO = new MongoProductsDAO();
    
    const {default: MongoMessagesDAO} = await import("../dao/mongo/manager/messageMongoManager.js");
    messagesDAO = new MongoMessagesDAO();
    
    const {default: MongoCartDAO} =  await import("../dao/mongo/manager/cartMongoManager.js");
    cartsDAO = new MongoCartDAO();

    const {default: MongoTicketsDAO} =  await import("../dao/mongo/manager/ticketMongoManager.js");
    ticketsDAO = new MongoTicketsDAO();

    break;  
}

export {usersDAO, productsDAO,messagesDAO, cartsDAO, ticketsDAO }




