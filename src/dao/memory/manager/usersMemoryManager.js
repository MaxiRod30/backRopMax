export default class UserMemoryManager {
    constructor() {
      this.users = [];
    }
  
    getUsers = () => {
      return this.users;
    };
  
    saveUser = (user) => {
      this.users.push(user);
    };

    findByCampo = (campo) =>{
      //findUser({ email: username }) llamda passport config
      return this.users.find(e => e == campo)
    }

    findId = async (id)=>{
      return this.users.find(e => e == id)
    }

    updateUser = (id,user) =>{

    }
  }
  