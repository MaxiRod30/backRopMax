import { Router } from 'express';
import  {viewProfile,viewRestoreFail,viewRestorePassword,viewRestore ,viewRegister,viewLogin,viewsGetProductsInCart,viewsGet,viewsGetRealTimeProducts,viewsGetProducts,viewChat} from '../controllers/views.controller.js';
import { passportCallRestore , passportCallLogin} from '../helpers/helpersPassportCall.js'
import authorization from '../middlewares/authorization.middlewares.js';

const router = Router();

router.get('/',[passportCallLogin("jwt")], viewsGet );

router.get('/realtimeproducts',[passportCallLogin("jwt")], viewsGetRealTimeProducts );

router.get('/products', [passportCallLogin("jwt")] , viewsGetProducts );

router.get('/cart',[
    passportCallLogin("jwt")
], viewsGetProductsInCart );

router.get('/chat',[passportCallLogin("jwt"), authorization("USER_ROLE")], viewChat );

router.get('/login', viewLogin );

router.get('/register', viewRegister );

router.get('/restore', viewRestore );

router.get('/restorePassword',[passportCallRestore("jwtRestore")], viewRestorePassword );

router.get('/failRestorePassword', viewRestoreFail );

router.get('/profile',[passportCallLogin("jwt")], viewProfile );


export default router;