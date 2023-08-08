import { userModel } from "../models/userModels.js"

export default class Users {
    constructor() {
        console.log(`Users`)
    }
    getAll = async () => {
        let users = await userModel.find();
        return users.map(user=>user.toObject())
    }
    saveUser = async (user) => {
        let result = await userModel.create(user);
        return result;
    }
}