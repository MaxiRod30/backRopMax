
import { Router } from 'express';
import  {cartsPostPurchase, cartsDeleteAllProducts, cartsPutUpdateProduct ,cartsPutUpdate, cartsDelete, cartsGet,cartsGetId,cartsPost,cartsPostAddProduct, cartsDeleteProductById} from '../controllers/carts.controller.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { check } from 'express-validator';
import { validarRolePremium, idCartExist,idProductExist } from '../helpers/db-validators.js'
import { passportCall } from '../helpers/helpersPassportCall.js';
import authorization from '../middlewares/authorization.middlewares.js';

const router = Router();

router.get('/carts',[passportCall("jwt")], cartsGet );
router.get('/carts/:cid',[passportCall("jwt")], cartsGetId );
router.post('/carts',[passportCall("jwt")], cartsPost );
router.post('/carts/:cid/product/:pid',[
    passportCall("jwt"),
    authorization(["USER_ROLE", "PREMIUM_ROLE"]),
    check('cid','No es un ID valido').isMongoId(),
    check('pid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    check('pid').custom(idProductExist),
    check('pid').custom(validarRolePremium),
    validarCampos
], cartsPostAddProduct );

router.post('/:cid/purchase',[
    passportCall("jwt"),
    authorization("USER_ROLE"),
    check('cid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    validarCampos
], cartsPostPurchase );

router.put('/carts/:cid',[
    passportCall("jwt"),
    authorization("USER_ROLE"),
    check('cid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    validarCampos
], cartsPutUpdate );

router.put('/carts/:cid/products/:pid',[
    passportCall("jwt"),
    check('cid','No es un ID valido').isMongoId(),
    check('pid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    check('pid').custom(idProductExist),
    validarCampos
], cartsPutUpdateProduct );

router.delete('/cart/:cid',[
    passportCall("jwt"),
    authorization("USER_ROLE"),
    check('cid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    validarCampos
], cartsDelete );

router.delete('/carts/:cid/products/:pid',[
    passportCall("jwt"),
    authorization("USER_ROLE"),
    check('cid','No es un ID valido').isMongoId(),
    check('pid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    check('pid').custom(idProductExist),
    validarCampos
], cartsDeleteProductById );

router.delete('/carts/:cid',[
    passportCall("jwt"),
    authorization("USER_ROLE"),
    check('cid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    validarCampos
], cartsDeleteAllProducts );


export default router;