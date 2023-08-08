import { Router } from 'express';
import  {viewRegister,viewLogin,viewsGetProductsInCart,viewsGet,viewsGetRealTimeProducts,viewsGetProducts,viewChat} from '../controllers/controllerViews.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { check } from 'express-validator';
import { idCartExist,idProductExist } from '../helpers/db-validators.js'
import { passportCallLogin} from '../helpers/helpersPassportCall.js'

const router = Router();

router.get('/',[passportCallLogin("jwt")], viewsGet );

router.get('/realtimeproducts',[passportCallLogin("jwt")], viewsGetRealTimeProducts );

router.get('/products', [passportCallLogin("jwt")] , viewsGetProducts );

router.get('/cart',[
    passportCallLogin("jwt")
], viewsGetProductsInCart );

router.get('/chat',[passportCallLogin("jwt")], viewChat );

router.get('/login', viewLogin );

router.get('/register', viewRegister );

export default router;