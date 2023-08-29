export default class messageMemoryManager {
    constructor() {
      this.messages = [];
    }
  
    getMessages = () => {
      return this.messages;
    };
  
    saveMessage = (message) => {
      this.messages.push(message);
    };


  }
  