export default class serviceMessages {
    constructor(dao) {
      this.dao = dao;
    }
    getmessages = () => {
        return this.dao.getMessages();
      };
    
    savemessage = (message) => {
        return this.dao.saveMessage(message);
      };
    
  }
  