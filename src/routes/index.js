import { Router } from "express";
import routerProducts from "./products.router.js"
import routerCarts from "./carts.router.js"
import routerSessions from "./sessions.router.js"
import routerViews from "./views.router.js"

const router = Router();

router.use("/api/products", routerProducts);
router.use("/api", routerCarts);
router.use('/api/sessions', routerSessions);
router.use('/', routerViews);

export default router;