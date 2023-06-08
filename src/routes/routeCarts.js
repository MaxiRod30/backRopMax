
import { Router } from 'express';
import  {cartsGet,cartsGetId,cartsPost,cartsPostAddProduct} from '../controllers/controllerCarts.js';

import CartManager from "../models/cartManager.js"

const carts = new CartManager("Carts.json")

const router = Router();

router.get('/', cartsGet );
router.get('/:cid', cartsGetId );
router.post('/', cartsPost );
router.post('/:cid/product/:pid', cartsPostAddProduct );

export default router;