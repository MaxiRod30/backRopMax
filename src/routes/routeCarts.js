
import { Router } from 'express';
import  {cartsDelete, cartsGet,cartsGetId,cartsPost,cartsPostAddProduct} from '../controllers/controllerCarts.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { check } from 'express-validator';
import { idCartExist,idProductExist } from '../helpers/db-validators.js'

const router = Router();

router.get('/', cartsGet );
router.get('/:cid', cartsGetId );
router.post('/', cartsPost );
router.post('/:cid/product/:pid',[
    check('cid','No es un ID valido').isMongoId(),
    check('pid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    check('pid').custom(idProductExist),
    validarCampos
], cartsPostAddProduct );

router.delete('/:cid',[
    check('cid','No es un ID valido').isMongoId(),
    check('cid').custom(idCartExist),
    validarCampos
], cartsDelete );

export default router;