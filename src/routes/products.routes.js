
import { Router } from 'express';
import  {productsGet,productsGetId,productsPost,productsPut,productsDelete} from '../controllers/products.controller.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { check } from 'express-validator';
import { codeProductExist,idProductExist }from '../helpers/db-validators.js'
import { passportCall } from "../helpers/helpersPassportCall.js";
import authorization from '../middlewares/authorization.middlewares.js';

const router = Router();

router.get('/',[passportCall("jwt")], productsGet );

router.get('/:pid',[
    passportCall("jwt"),
    check('pid','No es un ID valido').isMongoId(),
    check('pid').custom(idProductExist),
    validarCampos
],productsGetId );

router.post('/',[
    passportCall("jwt"), 
    authorization(["ADMIN_ROLE","PREMIUM_ROLE"]),
    check('title','El title es obligatorio').not().isEmpty(),
    check('description','La description es obligatorio').not().isEmpty(),
    check('code','La code es obligatorio').not().isEmpty(),
    check('code').custom(codeProductExist),
    check('price','La price es obligatorio').not().isEmpty(),
    check('price','La price tiene que ser numerico').isInt(),
    check('status','La status es obligatorio').not().isEmpty(),
    check('category','La category es obligatorio').not().isEmpty(),
    check('thumbnail','La thumbnail es obligatorio').not().isEmpty(),
    check('stock','La stock es obligatorio').not().isEmpty(),
    validarCampos
] ,productsPost );

router.put('/:pid',[
    passportCall("jwt"), 
    authorization(["ADMIN_ROLE","PREMIUM_ROLE"]),
    check('pid','No es un ID valido').isMongoId(),
    check('pid').custom(idProductExist),
    validarCampos
], productsPut );

router.delete('/:pid',[
    passportCall("jwt"), 
    authorization(["ADMIN_ROLE","PREMIUM_ROLE"]),
    check('pid','No es un ID valido').isMongoId(),
    check('pid').custom(idProductExist),
    validarCampos
], productsDelete );

export default router;