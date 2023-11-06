import { nanoid } from 'nanoid'
class TicketDTO {
    constructor(total, user, products) {
      this.code = nanoid();
      this.purchase_datetime = new Date();
      this.amount = total;
      this.purchaser = user.email;
      this.productsPurchase = products
    }
  }
  
  export default TicketDTO;