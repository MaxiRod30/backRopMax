import { Router } from 'express';
import  {viewRegister,viewLogin,viewsGetProductsInCart,viewsGet,viewsGetRealTimeProducts,viewsGetProducts,viewChat} from '../controllers/controllerViews.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { check } from 'express-validator';
import { idCartExist,idProductExist } from '../helpers/db-validators.js'

const router = Router();

router.get('/', viewsGet );

router.get('/realtimeproducts', viewsGetRealTimeProducts );

router.get('/products', viewsGetProducts );

router.get('/carts/:cid',[
    check('cid','No es un ID valido').isMongoId().not().isEmpty(),
    check('cid').custom(idCartExist),
    validarCampos
], viewsGetProductsInCart );

router.get('/chat', viewChat );

router.get('/login', viewLogin );

router.get('/register', viewRegister );

export default router;