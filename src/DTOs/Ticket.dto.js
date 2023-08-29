import { nanoid } from 'nanoid'
class TicketDTO {
    constructor(total, user) {
      this.code = nanoid();
      this.purchase_datetime = new Date();
      this.amount = total;
      this.purchaser = user.email;
    }
  }
  
  export default TicketDTO;