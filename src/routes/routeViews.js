import { Router } from 'express';
import  {viewsGet,viewsGetRealTimeProducts} from '../controllers/controllerViews.js';


const router = Router();

router.get('/', viewsGet );

router.get('/realtimeproducts', viewsGetRealTimeProducts );

export default router;