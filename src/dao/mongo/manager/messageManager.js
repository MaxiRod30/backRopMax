import messageModel from "../models/messageModels.js";

export default class MessageManager {

    constructor(){

        this.messageDB = this.init()
      
    }

    init = async () => {

        const mssm = await this.getMessages(1)
        return  mssm
    }

    getMessages = (limite) => {
        if(limite)
            return messageModel.find().limit(limite).lean();
        return  messageModel.find().lean();
    };
  
    getMessageById = (id) => {
      return messageModel.findById(id);
    };
  
    createMessages =  (message) =>{
        return  messageModel.create(message)
    }

    addMessage =  async (user,message)=>{
        
        const messageChat = await this.getMessageById("64a71d96e5beb053664b7c88")
        messageChat.messages.push({user: user , message: message})
        return await messageChat.save()
    }

  }