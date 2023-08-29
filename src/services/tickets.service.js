export default class serviceUsers {
    constructor(dao) {
      this.dao = dao;
    }
  
    getAllTickets = () => {
      return this.dao.getTickets();
    };
  
    createPurchaseTicket = (ticket) => {
      return this.dao.createTicket(ticket);
    };

    findTicketById = (id) =>{
      return this.dao.findId(id);
    }

  }
  