
import { Router } from 'express';
import  {productsGet,productsGetId,productsPost,productsPut,productsDelete} from '../controllers/controllerProducts.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { check } from 'express-validator';

const router = Router();

router.get('/', productsGet );

router.get('/:pid', productsGetId );

router.post('/',[
    check('title','El title es obligatorio').not().isEmpty(),
    check('description','La description es obligatorio').not().isEmpty(),
    check('code','La code es obligatorio').not().isEmpty(),
    check('price','La price es obligatorio').not().isEmpty(),
    check('status','La status es obligatorio').not().isEmpty(),
    check('category','La category es obligatorio').not().isEmpty(),
    check('thumbnail','La thumbnail es obligatorio').not().isEmpty(),
    check('stock','La stock es obligatorio').not().isEmpty(),
    validarCampos
] ,productsPost );

router.put('/:pid', productsPut );

router.delete('/:pid', productsDelete );

export default router;