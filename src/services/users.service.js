export default class serviceUsers {
    constructor(dao) {
      this.dao = dao;
    }
  
    getAllUsers = () => {
      return this.dao.getUsers();
    };
  
    createUser = (user) => {
      return this.dao.saveUser(user);
    };

    findUser = (campo) =>{
      return this.dao.findByCampo(campo);
    }

    findIdUser = (id) =>{
      return this.dao.findId(id);
    }
  }
  