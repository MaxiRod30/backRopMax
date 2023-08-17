import { messagesService } from '../../services/index.js';

let array = []
export const socketController = async(socket,io) => {
	
	let messages = await messagesService.getmessages()

	console.log("New client connected");

	io.emit("messageLogs", messages);
	socket.broadcast.emit("messageConected", "Un nuevo usuario se ha conectado");

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});

	socket.on("message", async (data) => {
		await messagesService.savemessage(data);
		array = await messagesService.getmessages()
		io.emit("messageLogs", array);
	  });
}