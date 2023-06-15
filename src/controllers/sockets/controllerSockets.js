import products from "../../../products.json" assert { type: "json" };

export const socketController = (socket) => {
    
	console.log("New client connected");

	
	socket.emit("products", products);

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});

}