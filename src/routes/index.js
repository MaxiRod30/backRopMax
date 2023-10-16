import { Router } from "express";
import routerProducts from "./products.routes.js"
import routerCarts from "./carts.routes.js"
import routerSessions from "./sessions.routes.js"
import routerViews from "./views.routes.js"
import routerMock from "../mock/routes/products.routes.js"
import routerUsers from "./users.routes.js"
import routerLoggerTest from "../routes/loggerTest.routes.js"

const router = Router();

router.use("/api/products", routerProducts);
router.use("/api", routerCarts);
router.use('/api/sessions', routerSessions);
router.use('/', routerViews);
router.use("/api", routerMock )
router.use("/api", routerLoggerTest )
router.use("/api/users", routerUsers )

export default router;