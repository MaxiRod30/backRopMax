import { Router } from 'express';
import  {viewsGet,viewsGetRealTimeProducts,viewsGetProducts,viewChat} from '../controllers/controllerViews.js';


const router = Router();

router.get('/', viewsGet );

router.get('/realtimeproducts', viewsGetRealTimeProducts );

router.get('/products', viewsGetProducts );

router.get('/chat', viewChat );


export default router;