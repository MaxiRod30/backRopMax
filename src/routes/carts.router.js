
import { Router } from 'express';
import  {cartsDeleteAllProducts, cartsPutUpdateProduct ,cartsPutUpdate, cartsDelete, cartsGet,cartsGetId,cartsPost,cartsPostAddProduct, cartsDeleteProductById} from '../controllers/carts.controller.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { check } from 'express-validator';
import { idCartExist,idProductExist } from '../helpers/db-validators.js'

const router = Router();

router.get('/carts', cartsGet );
router.get('/carts/:cid', cartsGetId );
router.post('/carts', cartsPost );
router.post('/carts/:cid/product/:pid',[
    check('cid','No es un ID valido').isMongoId(),
    check('pid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    check('pid').custom(idProductExist),
    validarCampos
], cartsPostAddProduct );

router.put('/carts/:cid',[
    check('cid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    validarCampos
], cartsPutUpdate );

router.put('/carts/:cid/products/:pid',[
    check('cid','No es un ID valido').isMongoId(),
    check('pid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    check('pid').custom(idProductExist),
    validarCampos
], cartsPutUpdateProduct );

router.delete('/cart/:cid',[
    check('cid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    validarCampos
], cartsDelete );

router.delete('/carts/:cid/products/:pid',[
    check('cid','No es un ID valido').isMongoId(),
    check('pid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    check('pid').custom(idProductExist),
    validarCampos
], cartsDeleteProductById );

router.delete('/carts/:cid',[
    check('cid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    validarCampos
], cartsDeleteAllProducts );


export default router;