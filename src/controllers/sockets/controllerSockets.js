import ProductsManager from "../../dao/mongo/manager/productManager.js";
import MessageManager from "../../dao/mongo/manager/messageManager.js";

const productsManager = new ProductsManager();
const messageManager = new MessageManager();


const messages = []

export const socketController = async(socket,io) => {

	const products = await productsManager.getProducts()

	console.log("New client connected");
	

	io.emit("products", products);

	io.emit("messageLogs", messages);
	socket.broadcast.emit("messageConected", "Un nuevo usuario se ha conectado");

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});

	socket.on("message", async (data) => {
		messages.push(data);
		io.emit("messageLogs", messages);
	  });
}