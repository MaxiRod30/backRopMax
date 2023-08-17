import messageModel from "../models/messageModels.js";

export default class MessageManager {

    constructor(){
        this.idChat = "64a71d96e5beb053664b7c88"
    }

    getMessages = async () => {
        let array = []
        let mesajes =  await messageModel.findById(this.idChat).lean();   

        mesajes.messages.forEach(element => {
            array.push({user:element.user, message:element.message})
        });
        return  array
    };
  
    saveMessage =  async (message)=>{
        
        const messageChat = await messageModel.findById(this.idChat)
        messageChat.messages.push(message)
        let mensaje = await messageChat.save()
        return mensaje
    }

  }