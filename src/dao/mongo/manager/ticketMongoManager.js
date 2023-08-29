import  ticketModel  from "../models/ticketModels.js"

export default class Tickets {
    constructor() {
        
    }
    getTickets = async () => {
        let users = await ticketModel.find();
        return users.map(user=>user.toObject())
    }

    createTicket = async (data) => {
        let result = await ticketModel.create(data);
        return result;
    }

    findId = async (id)=>{
        let result = await ticketModel.findById(id)
        return result
    }
}