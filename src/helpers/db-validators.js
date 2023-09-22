import { productsService } from '../services/index.js';
import { usersService } from '../services/index.js';
import { cartsService } from '../services/index.js';

export const codeProductExist = async(code) =>{
    const exitCode = await productsService.getProductsbyCode({code: code})
   
    if(exitCode){
        throw new Error( 'Este code ya esta registrado');
    }
}

export const idProductExist = async(id) =>{
    const exitId = await productsService.getProductsbyId(id)
   
    if(!exitId){
        throw new Error( 'Este ID de producto no esta registrado');
    }
}

export const idCartExist = async(cid) =>{

    const exitCartId = await cartsService.getCartbyId(cid)
    if(!exitCartId){
        throw new Error( 'Este ID cart no esta registrado');
    }
}

export const validarRolePremium = async(id) =>{
    const prod = await productsService.getProductsbyId(id)
    const user = await usersService.findUser({email: prod.owner})
    
    if(user){
        if(user.rol == "PREMIUM_ROLE"){
            throw new Error( 'No puede agregar un producto creado por usted!');
        }
    }
}

