import productModel from '../dao/mongo/models/productModels.js'
import cartModel from '../dao/mongo/models/cartModels.js'

export const codeProductExist = async(code) =>{
    const exitCode = await productModel.findOne({code: code})
   
    if(exitCode){
        throw new Error( 'Este code ya esta registrado');
    }
}

export const idProductExist = async(id) =>{
    const exitId = await productModel.findById(id)
   
    if(!exitId){
        throw new Error( 'Este ID de producto no esta registrado');
    }
}

export const idCartExist = async(cid) =>{

    const exitCartId = await cartModel.findById(cid)
    if(!exitCartId){
        throw new Error( 'Este ID cart no esta registrado');
    }
}


