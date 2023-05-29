
import { Router } from 'express';
import  {productsGet,productsGetId} from '../controllers/controllerProducts.js';

const router = Router();

router.get('/', productsGet );
router.get('/:pid', productsGetId );

export default router;