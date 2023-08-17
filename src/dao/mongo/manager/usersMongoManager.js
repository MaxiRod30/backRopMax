import  userModel  from "../models/userModels.js"

export default class Users {
    constructor() {
        
    }
    getUsers = async () => {
        let users = await userModel.find();
        return users.map(user=>user.toObject())
    }

    saveUser = async (user) => {
        let result = await userModel.create(user);
        return result;
    }

    findByCampo = async (campo) =>{
        let result = await userModel.findOne(campo)
        return result;
    }

    findId = async (id)=>{
        let result = await userModel.findById(id)
        return result
    }
}