import mongoose from "mongoose";

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
    messages: 
         [{user : String , message: String}]  
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;